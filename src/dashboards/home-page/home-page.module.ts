import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared.module";
import { HomePageComponent } from "./home-page.component";

@NgModule({
   declarations: [
      HomePageComponent
   ],
   imports: [
      SharedModule,
      CommonModule,
      RouterModule.forChild([{ path: '', component: HomePageComponent }])
   ]
})
export class HomePageModule { }