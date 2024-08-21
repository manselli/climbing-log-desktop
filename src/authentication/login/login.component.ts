import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthService } from "src/services/auth.service";
import { MessageService } from "src/services/message.service";
import { AUTHENTICATION_PAGE_ACTIONS } from "../store/authentication.actions";


export type LoginFormType = {
    username: FormControl<string | null>,
    password: FormControl<string | null>
}
@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

    public loginForm: FormGroup<LoginFormType>;
    public seePassword: boolean;

    constructor(
        private _store: Store,
        private _router: Router,
        private _authService: AuthService,
        private _messageService: MessageService
    ) {
        this.seePassword = false
        this.loginForm = new FormGroup<LoginFormType>({
            username: new FormControl<string | null>('', Validators.required),//lucasarge4@gmail.com
            password: new FormControl<string | null>('', Validators.required)//Qazplm700!
        });

        //prevent routing to the last dashboard page
        this._authService.setRequestedUrl('dashboard');
    }

    onSubmit() {
        console.log('on submit')
        Object.values(this.loginForm.controls).forEach(control => {
            control.markAsTouched();
            control.updateValueAndValidity();
        });
        this.loginForm.updateValueAndValidity();
        if (!this.loginForm.valid) {
            console.log('pippo1')
            this._messageService.addMessage({ alert: "danger", messageText: `ERRORE: compilare tutti i campi obbligatori` })
            return
        }
        console.log('click login')
        this._store.dispatch(AUTHENTICATION_PAGE_ACTIONS.clickLogin(this.loginForm.value as { username: string, password: string }));
    }

    handleSeePassword() {
        this.seePassword = !this.seePassword
    }
    redirectToRegistration() {
        this._router.navigate(['authentication/registration'])
    }

    pippo() {
        console.log(this.loginForm.getRawValue());
    }
}