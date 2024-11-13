import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared.module";
import { TrainingLogComponent } from "./training-log.component";

@NgModule({
   declarations: [
      TrainingLogComponent
   ],
   imports: [
      SharedModule,
      CommonModule,
      RouterModule.forChild([{ path: '', component: TrainingLogComponent }])
   ]
})
export class TrainingLogModule { }