import {Component, ElementRef} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {User} from "../share/module/User";

@Component({
    selector: 'app-login',
    templateUrl: 'appLogin.component.html'
})
export class AppLoginComponent {
    private jwtToken = "";
    private user = new User();

    constructor(protected a_router: Router, public element: ElementRef, public route: ActivatedRoute,
                private _userService: UserService) {
        this.loginWithTest();
    }

    // loginWithWeChat() {
    //   this.route.params
    //     .map(params => {
    //       return {token: params.token, id: params.id, state: params.state};
    //     }).subscribe(
    //     (result) => {
    //       this.jwtToken = result.token;
    //       localStorage.setItem('token', result.token);
    //       this._userService.get(result.id)
    //         .map((user) => {
    //           return user;
    //         }).subscribe(
    //         user => {
    //           this.user = user;
    //           localStorage.setItem('loginUser', JSON.stringify(this.user));
    //         },
    //         err => {
    //           this.jwtToken = JSON.stringify(err);
    //         }
    //       );
    //     });
    // }

    loginWithTest() {
      this.toJump('/dashboard');
    }

    toJump(url) {
        this.a_router.navigate([url]);
    }



}
