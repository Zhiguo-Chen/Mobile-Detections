import {Component, ElementRef, Input} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {BaseAuthenticateComponent} from "../component/baseAuthenticate.component";


@Component({
    selector: "app-tabbar",
    templateUrl: "./tabBar.component.html"
})
export class TabBarComponent extends BaseAuthenticateComponent {
    @Input() index: number = 0;
    unlearnedCoursesNum: number = 0;

    constructor(protected a_router: Router, public element: ElementRef,
                public route: ActivatedRoute) {
        super(a_router, element, route);
    }


}
