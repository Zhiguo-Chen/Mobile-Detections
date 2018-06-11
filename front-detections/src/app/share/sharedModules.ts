import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {WeUIModule} from "angular-weui";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    imports: [CommonModule, RouterModule, HttpClientModule, FormsModule, ReactiveFormsModule, WeUIModule],
    declarations: [],
    exports: [CommonModule, FormsModule, RouterModule, HttpClientModule, ReactiveFormsModule, WeUIModule]
})
export class SharedModules {
}
