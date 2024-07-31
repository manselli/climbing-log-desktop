import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EXPORT_DECLARATIONS } from "./app.routes";

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
    ],
    exports: [
        ...EXPORT_DECLARATIONS,
        FormsModule,
        ReactiveFormsModule,
        //  TranslateModule,
        // AlbiUiLibraryModule,
    ]
})
export class SharedModule { }