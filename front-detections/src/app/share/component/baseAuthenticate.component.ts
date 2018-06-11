import {AfterViewInit, ElementRef, OnInit, ViewChild, Inject} from "@angular/core";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../module/User";

export abstract class BaseAuthenticateComponent implements AfterViewInit, OnInit {
    public loginUser: User;
    protected token: string;

    constructor(protected a_router: Router, public element: ElementRef, public route: ActivatedRoute,
                protected authentication: boolean = true, private location?: Location) {
        this.loginUser = JSON.parse(localStorage.getItem("loginUser"));
        this.token = localStorage.getItem("token");
        if (authentication) {
            // this.jumpToLoginIfNotAuthenticate();
        }
    }

    ngOnInit() {
        const el: HTMLElement = this.element.nativeElement;
        const page: Element = el.firstElementChild;
        page.classList.add('slideIn', 'home');
        page.addEventListener("animationend", () => {
            page.classList.remove("slideIn");
            page.classList.add("js_show");
        });

        this.showLoading();
    }

    updateLocalUser() {
        localStorage.setItem("loginUser", JSON.stringify(this.loginUser));
    }

    refreshLocalUser() {
        this.loginUser = JSON.parse(localStorage.getItem("loginUser"));
    }

    jumpToLoginIfNotAuthenticate() {
        if (!this.loginUser || !this.token) {
            this.a_router.navigate(["/login"]);
        }
    }

    jumpToHome() {
        this.a_router.navigate(['/']);
    }

    jumpToUrl(url: string) {
        this.a_router.navigate([url]);
    }

    goBack() {
        this.location.back();
    }

    handleError(message) {
        this.hideLoading();
    }

    showLoading() {
        if (this.element.nativeElement.getElementsByClassName("loading-block").length === 0) {
            const loadingBlock = "<div class='loading-block' ><img src='/assets/loading-bubbles.svg' width='100' height='100' /></div>";
            this.element.nativeElement.insertAdjacentHTML('beforeend', loadingBlock);
        }
    }

    hideLoading() {
        if (this.element.nativeElement.getElementsByClassName("loading-block").length !== 0) {
            this.element.nativeElement.getElementsByClassName("loading-block")[0].remove();
        }
    }

    ngAfterViewInit() {
        this.hideLoading();
    }

    getFormatTime(time: string) {
        if (time) {
            const date = new Date(time.replace(/-/g, '/'));
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hour = date.getHours();
            const minite = date.getMinutes();
            return year + "-" + ('0' + month).slice(-2) + "-" + ('0' + day).slice(-2) + " "
                + ('0' + hour).slice(-2) + ":" + ('0' + minite).slice(-2);
        } else {
            return "";
        }
    }

    getFormatDate(time: string) {
        if (time) {
            const date = new Date(time.replace(/-/g, '/'));
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            return year + "-" + ('0' + month).slice(-2) + "-" + ('0' + day).slice(-2);
        } else {
            return "";
        }
    }

    formatMoney(money: number) {
        if (money || money === 0) {
            return money.toFixed(2);
        }
    }
}
