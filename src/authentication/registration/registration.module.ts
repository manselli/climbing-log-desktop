import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared.module";
import { RegistrationComponent } from "./registration.component";

@NgModule({
   declarations: [
      RegistrationComponent
   ],
   imports: [
      SharedModule,
      CommonModule,
      RouterModule.forChild([{ path: '', component: RegistrationComponent }])
   ]
})
export class RegistrationModule { }