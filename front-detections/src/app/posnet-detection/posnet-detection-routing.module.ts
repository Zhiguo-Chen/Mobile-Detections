import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PosnetDetectionComponent} from "./posnet-detection.component";

const routes: Routes = [
  {
    path: '',
    component: PosnetDetectionComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class PosnetDetectionRoutingModule {}
