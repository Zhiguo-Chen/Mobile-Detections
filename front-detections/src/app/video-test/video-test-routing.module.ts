import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {VideoTestComponent} from "./video-test.component";

const routes: Routes = [
  {
    path: '',
    component: VideoTestComponent
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
export class VideoTestRoutingModule {}
