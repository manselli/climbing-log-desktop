import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared.module";
import { CragLogComponent } from "./crag-log.component";

@NgModule({
   declarations: [
      CragLogComponent
   ],
   imports: [
      SharedModule,
      CommonModule,
      RouterModule.forChild([{ path: '', component: CragLogComponent }])
   ]
})
export class CragLogModule { }