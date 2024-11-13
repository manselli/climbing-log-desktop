import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EXPORT_DECLARATIONS } from "./app.routes";
import { CommonPrimeModule } from "./common-prime.module";

@NgModule({
    declarations: [
        ...EXPORT_DECLARATIONS,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        //   TranslateModule,
        // AlbiUiLibraryModule,
        CommonPrimeModule
    ],
    exports: [
        ...EXPORT_DECLARATIONS,
        FormsModule,
        ReactiveFormsModule,
        //  TranslateModule,
        // AlbiUiLibraryModule,
        CommonPrimeModule,
    ]
})
export class SharedModule { }