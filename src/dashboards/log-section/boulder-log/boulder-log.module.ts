import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared.module";
import { BoulderLogComponent } from "./boulder-log.component";

@NgModule({
   declarations: [
      BoulderLogComponent
   ],
   imports: [
      SharedModule,
      CommonModule,
      RouterModule.forChild([{ path: '', component: BoulderLogComponent }])
   ]
})
export class BoulderLogModule { }