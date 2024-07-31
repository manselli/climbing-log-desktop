import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { MessageService } from "src/services/message.service";
import { AUTHENTICATION_PAGE_ACTIONS } from "../store/authentication.actions";


export type RegistrationFormType = {
    name: FormControl<string | null>,
    lastname: FormControl<string | null>,
    email: FormControl<string | null>,
    password: FormControl<string | null>,
    checkPassword: FormControl<string | null>,
    acceptTermsAndCondition: FormControl<boolean | null>,
}
export const StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

@Component({
    selector: 'registration',
    templateUrl: 'registration.component.html',
    styleUrls: ['registration.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {

    public registrationForm: FormGroup<RegistrationFormType>;
    public seePassword: boolean;

    constructor(private _store: Store, private _router: Router, private _messageService: MessageService) {
        this.seePassword = false
        this.registrationForm = new FormGroup<RegistrationFormType>({
            name: new FormControl<string | null>('', Validators.required),
            lastname: new FormControl<string | null>('', Validators.required),
            email: new FormControl<string | null>('', [Validators.required, Validators.email]),
            password: new FormControl<string | null>('', [Validators.required, Validators.pattern(StrongPasswordRegx)]),
            checkPassword: new FormControl<string | null>('', Validators.required),
            acceptTermsAndCondition: new FormControl<boolean | null>(null, Validators.required),
        });
    }

    onSubmit() {
        const registrationFormValue = this.registrationForm.getRawValue();
        this.makeRegistrationFormDirty();
        Object.values(this.registrationForm.controls).forEach(control => {
            control.markAsTouched();
            control.updateValueAndValidity();
        })
        if (!this.registrationForm.valid || !registrationFormValue.acceptTermsAndCondition) {
            this._messageService.addMessage({ messageText: 'ERRORE: compilare correttamente tutti i campi obbligatori', alert: 'danger' })
            return
        }
        if (registrationFormValue.password !== registrationFormValue.checkPassword) {
            this._messageService.addMessage({ messageText: 'Le password non coincidono', alert: 'warning' })
            return;
        }
        this._store.dispatch(AUTHENTICATION_PAGE_ACTIONS.clickRegister({
            name: registrationFormValue.name,
            lastname: registrationFormValue.lastname,
            username: registrationFormValue.email,
            password: registrationFormValue.password,
        }))
    }

    handleSeePassword() {
        this.seePassword = !this.seePassword
    }
    redirectToRegistration() {
        this._router.navigate(['authentication/login'])
    }


    public makeRegistrationFormDirty() {
        this.registrationForm.markAsDirty();
        Object.values(this.registrationForm.controls).forEach(elm => elm.markAsDirty());
    }
    pippo() {
        console.log(this.registrationForm.getRawValue());
    }
}