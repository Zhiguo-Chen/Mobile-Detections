import { Component, OnInit } from '@angular/core';
import dat from 'dat.gui';
import * as Stats from 'stats.js';
import * as posenet from '../share/posenet';

import { drawKeypoints, drawSkeleton } from './posnet-util';

@Component({
  selector: 'app-posnet-detection',
  templateUrl: './posnet-detection.component.html',
  styleUrls: ['./posnet-detection.component.css']
})
export class PosnetDetectionComponent implements OnInit {
  videoWidth = 600;
  videoHeight = 500;
  stats = new Stats();

  public guiState: any = {
    algorithm: 'single-pose',
    input: {
      mobileNetArchitecture: this.isMobile() ? '0.50' : '1.01',
      outputStride: 16,
      imageScaleFactor: 0.5,
    },
    singlePoseDetection: {
      minPoseConfidence: 0.1,
      minPartConfidence: 0.5,
    },
    multiPoseDetection: {
      maxPoseDetections: 2,
      minPoseConfidence: 0.1,
      minPartConfidence: 0.3,
      nmsRadius: 20.0,
    },
    output: {
      showVideo: true,
      showSkeleton: true,
      showPoints: true,
    },
    net: null,
  };

  constructor() { }

  ngOnInit() {
    navigator.getUserMedia = navigator.getUserMedia;
    this.bindPage();
  }

  private isAndroid() {
    return /Android/i.test(navigator.userAgent);
  }

  private isiOS() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  private isMobile() {
    return this.isAndroid() || this.isiOS();
  }

  async setupCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw 'Browser API navigator.mediaDevices.getUserMedia not available';
    }

    const video = document.getElementById('video') as any;
    video.width = this.videoWidth;
    video.height = this.videoHeight;

    const mobile = this.isMobile();
    const stream = await navigator.mediaDevices.getUserMedia({
      'audio': false,
      'video': {
        facingMode: 'user',
        width: mobile ? undefined : this.videoWidth,
        height: mobile ? undefined: this.videoHeight}
    });
    video.srcObject = stream;

    return new Promise(resolve => {
      video.onloadedmetadata = () => {
        resolve(video);
      };
    });
  }

  async loadVideo() {
    const video = await this.setupCamera() as any;
    video.play();

    return video;
  }

  private setupGui(cameras, net) {
    this.guiState.net = net;

    if (cameras.length > 0) {
      this.guiState.camera = cameras[0].deviceId;
    }

    const cameraOptions = cameras.reduce((result, { label, deviceId }) => {
      result[label] = deviceId;
      return result;
    }, {});

    const gui = new dat.GUI({ width: 300 });

    // The single-pose algorithm is faster and simpler but requires only one person to be
    // in the frame or results will be innaccurate. Multi-pose works for more than 1 person
    const algorithmController = gui.add(
      this.guiState, 'algorithm', ['single-pose', 'multi-pose']);

    // The input parameters have the most effect on accuracy and speed of the network
    let input = gui.addFolder('Input');
    // Architecture: there are a few PoseNet models varying in size and accuracy. 1.01
    // is the largest, but will be the slowest. 0.50 is the fastest, but least accurate.
    const architectureController =
      input.add(this.guiState.input, 'mobileNetArchitecture', ['1.01', '1.00', '0.75', '0.50']);
    // Output stride:  Internally, this parameter affects the height and width of the layers
    // in the neural network. The lower the value of the output stride the higher the accuracy
    // but slower the speed, the higher the value the faster the speed but lower the accuracy.
    input.add(this.guiState.input, 'outputStride', [8, 16, 32]);
    // Image scale factor: What to scale the image by before feeding it through the network.
    input.add(this.guiState.input, 'imageScaleFactor').min(0.2).max(1.0);
    input.open();

    // Pose confidence: the overall confidence in the estimation of a person's
    // pose (i.e. a person detected in a frame)
    // Min part confidence: the confidence that a particular estimated keypoint
    // position is accurate (i.e. the elbow's position)
    let single = gui.addFolder('Single Pose Detection');
    single.add(this.guiState.singlePoseDetection, 'minPoseConfidence', 0.0, 1.0);
    single.add(this.guiState.singlePoseDetection, 'minPartConfidence', 0.0, 1.0);
    single.open();

    let multi = gui.addFolder('Multi Pose Detection');
    multi.add(
      this.guiState.multiPoseDetection, 'maxPoseDetections').min(1).max(20).step(1);
    multi.add(this.guiState.multiPoseDetection, 'minPoseConfidence', 0.0, 1.0);
    multi.add(this.guiState.multiPoseDetection, 'minPartConfidence', 0.0, 1.0);
    // nms Radius: controls the minimum distance between poses that are returned
    // defaults to 20, which is probably fine for most use cases
    multi.add(this.guiState.multiPoseDetection, 'nmsRadius').min(0.0).max(40.0);

    let output = gui.addFolder('Output');
    output.add(this.guiState.output, 'showVideo');
    output.add(this.guiState.output, 'showSkeleton');
    output.add(this.guiState.output, 'showPoints');
    output.open();


    architectureController.onChange(function (architecture) {
      this.guiState.changeToArchitecture = architecture;
    });

    algorithmController.onChange(function (value) {
      switch (this.guiState.algorithm) {
        case 'single-pose':
          multi.close();
          single.open();
          break;
        case 'multi-pose':
          single.close();
          multi.open();
          break;
      }
    });
  }

  private setupFPS() {
    this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this.stats.dom);
  }

  private detectPoseInRealTime(video, net) {
    const canvas = document.getElementById('output') as any;
    const ctx = canvas.getContext('2d');
    const flipHorizontal = true; // since images are being fed from a webcam

    canvas.width = this.videoWidth;
    canvas.height = this.videoHeight;
    const guiStateCopy = this.guiState;
    const statsCopy = this.stats;
    const videoWidthCopy = this.videoWidth;
    const videoHeightCopy = this.videoHeight;
    async function poseDetectionFrame() {
      if (guiStateCopy.changeToArchitecture) {
        // Important to purge variables and free up GPU memory
        guiStateCopy.net.dispose();

        // Load the PoseNet model weights for either the 0.50, 0.75, 1.00, or 1.01 version
        guiStateCopy.net = await posenet.load(Number(guiStateCopy.changeToArchitecture) as any);

        guiStateCopy.changeToArchitecture = null;
      }

      // Begin monitoring code for frames per second
      statsCopy.begin();

      // Scale an image down to a certain factor. Too large of an image will slow down
      // the GPU
      const imageScaleFactor = guiStateCopy.input.imageScaleFactor;
      const outputStride = Number(guiStateCopy.input.outputStride);

      let poses = [];
      let minPoseConfidence;
      let minPartConfidence;
      switch (guiStateCopy.algorithm) {
        case 'single-pose':
          const pose = await guiStateCopy.net.estimateSinglePose(video, imageScaleFactor, flipHorizontal, outputStride);
          poses.push(pose);

          minPoseConfidence = Number(
            guiStateCopy.singlePoseDetection.minPoseConfidence);
          minPartConfidence = Number(
            guiStateCopy.singlePoseDetection.minPartConfidence);
          break;
        case 'multi-pose':
          poses = await guiStateCopy.net.estimateMultiplePoses(video, imageScaleFactor, flipHorizontal, outputStride,
            guiStateCopy.multiPoseDetection.maxPoseDetections,
            guiStateCopy.multiPoseDetection.minPartConfidence,
            guiStateCopy.multiPoseDetection.nmsRadius);

          minPoseConfidence = Number(guiStateCopy.multiPoseDetection.minPoseConfidence);
          minPartConfidence = Number(guiStateCopy.multiPoseDetection.minPartConfidence);
          break;
      }

      ctx.clearRect(0, 0, videoWidthCopy, videoHeightCopy);

      if (guiStateCopy.output.showVideo) {
        ctx.save();
        ctx.scale(-1, 1);
        ctx.translate(-videoWidthCopy, 0);
        ctx.drawImage(video, 0, 0, videoWidthCopy, videoHeightCopy);
        ctx.restore();
      }

      // For each pose (i.e. person) detected in an image, loop through the poses
      // and draw the resulting skeleton and keypoints if over certain confidence
      // scores
      poses.forEach(({ score, keypoints }) => {
        if (score >= minPoseConfidence) {
          if (guiStateCopy.output.showPoints) {
            drawKeypoints(keypoints, minPartConfidence, ctx);
          }
          if (guiStateCopy.output.showSkeleton) {
            drawSkeleton(keypoints, minPartConfidence, ctx);
          }
        }
      });

      // End monitoring code for frames per second
      statsCopy.end();

      requestAnimationFrame(poseDetectionFrame);
    }
    poseDetectionFrame();
  }


  async bindPage() {
    // Load the PoseNet model weights for version 1.01
    const net = await posenet.load();

    document.getElementById('loading').style.display = 'none';
    document.getElementById('main').style.display = 'block';

    let video;

    try {
      video = await this.loadVideo();
    } catch(e) {
      let info = document.getElementById('info');
      info.textContent = "this browser does not support video capture, or this device does not have a camera";
      info.style.display = 'block';
      throw e;
    }

    this.setupGui([], net);
    this.setupFPS();
    this.detectPoseInRealTime(video, net);
  }


}
