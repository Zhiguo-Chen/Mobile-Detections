import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosnetDetectionComponent } from './posnet-detection.component';
import {PosnetDetectionRoutingModule} from "./posnet-detection-routing.module";

@NgModule({
  imports: [
    CommonModule,
    PosnetDetectionRoutingModule,
  ],
  declarations: [PosnetDetectionComponent]
})
export class PosnetDetectionModule { }
