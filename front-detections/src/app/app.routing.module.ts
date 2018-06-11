import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {appLoginRoutes} from "./login/appLogin.routes";
import {AppLoginComponent} from "./login/appLogin.component";

const routes: Routes = [
  ...appLoginRoutes,
  {path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule'},
  {path: '**', component: AppLoginComponent}
  // {
  //   path: '',
  //   component: AppComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: DashboardComponent
  //     },
  //     {
  //       path: 'video-test',
  //       loadChildren: 'app/video-test/video-test.module#VideoTestModule'
  //     }
  //   ]
  // },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule{}
