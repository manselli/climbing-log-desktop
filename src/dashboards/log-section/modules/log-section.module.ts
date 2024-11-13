import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared.module";
import { LogSectionComponent } from "../log-section.component";
import { LOG_ROUTES } from "./log-section.routes";

@NgModule({
   declarations: [
      LogSectionComponent
   ],
   imports: [
      SharedModule,
      CommonModule,
      RouterModule.forChild(LOG_ROUTES)
   ]
})
export class LogSectionModule { }