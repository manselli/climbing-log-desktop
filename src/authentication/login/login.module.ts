import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared.module";
import { LoginComponent } from "./login.component";

@NgModule({
   declarations: [
      LoginComponent
   ],
   imports: [
      SharedModule,
      CommonModule,
      RouterModule.forChild([{ path: '', component: LoginComponent }])
   ]
})
export class LoginModule { }