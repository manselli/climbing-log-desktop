import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AuthGuard } from "src/authentication/guards/auth.guard";
import { AuthenticationEffects } from "src/authentication/store/authentication.effects";
import { authenticationReducer } from "src/authentication/store/authentication.reducers";
import { HeaderMessageService } from "src/services/header-message.service";
import { MessageService } from "src/services/message.service";
import { AuthService } from "../services/auth.service";
import { BackendService } from "../services/backend.service";
import { LocalStorageService } from "../services/local-storage.service";
import { AppComponent } from "./app.component";
import { DECLARATIONS, ROUTES } from "./app.routes";
import { SharedModule } from "./shared.module";

@NgModule({
    declarations: [
        ...DECLARATIONS,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        /* TranslateModule.forRoot({
             loader: {
                 provide: TranslateLoader,
                 useClass: AlbiTranslateLoader
             }
         }),*/
        FormsModule,
        RouterModule.forRoot(ROUTES),
        StoreModule.forRoot({ authentication: authenticationReducer }),
        EffectsModule.forRoot([AuthenticationEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: true, // Restrict extension to log-only mode
        }),
        HttpClientModule,
        SharedModule,
    ],
    providers: [
        AuthService,
        AuthGuard,
        BackendService,
        LocalStorageService,
        MessageService,
        HeaderMessageService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }

/*
// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}*/