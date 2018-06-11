import {Route} from "@angular/router";
import {AppLoginComponent} from "./appLogin.component";

export const appLoginRoutes: Route[] = [
    {
        // path: 'wechatlogin/:token',
        path: 'wechatlogin',
        component: AppLoginComponent
    }
];
