import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from "./dashboard.component";
import {SharedModules} from "../share/sharedModules";
import {TabBarModule} from "../share/tabBar/tabBar.module";
import {RouterModule} from "@angular/router";
import {dashboardRoutes} from "./dashboard-routing.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModules,
    TabBarModule,
    RouterModule.forChild(dashboardRoutes),
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
