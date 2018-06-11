import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app.routing.module";
import {SharedModules} from "./share/sharedModules";
import {AppLoginComponent} from "./login/appLogin.component";
import {UserService} from "./service/user.service";


@NgModule({
  declarations: [
    AppComponent,
    AppLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModules,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
