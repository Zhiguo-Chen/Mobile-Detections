import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VideoTestRoutingModule} from "./video-test-routing.module";
import {VideoTestComponent} from "./video-test.component";

@NgModule({
  imports: [
    CommonModule,
    VideoTestRoutingModule
  ],
  declarations: [VideoTestComponent]
})
export class VideoTestModule { }
