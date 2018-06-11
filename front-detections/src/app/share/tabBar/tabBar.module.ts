import {NgModule} from "@angular/core";
import {TabBarComponent} from "./tabBar.component";
import {SharedModules} from "../sharedModules";

@NgModule({
    imports: [SharedModules],
    declarations: [TabBarComponent],
    providers: [],
    exports: [TabBarComponent]
})
export class TabBarModule {
}

