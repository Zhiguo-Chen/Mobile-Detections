import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Webcam} from "./webcam";

@Component({
  selector: 'app-vedio-test',
  templateUrl: './video-test.component.html',
  styleUrls: ['./video-test.component.css']
})
export class VideoTestComponent implements OnInit {
  @ViewChild('webcam') webcamRef: ElementRef;
  webcam: Webcam;
  constructor() { }

  ngOnInit() {
    this.webcam = new Webcam(this.webcamRef.nativeElement);
    this.webcam.setup();
  }

}
