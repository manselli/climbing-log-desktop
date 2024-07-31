
import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { Observable, delay, filter } from 'rxjs';
import { MessageService } from 'src/services/message.service';
import { AUTHENTICATION_SELECTORS } from './store/authentication.selectors';



@Component({
    selector: 'authentication-component',
    templateUrl: `./authentication.component.html`,
    styleUrls: ['./authentication.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class AuthenticationComponent implements AfterViewInit, OnInit {
    private readonly _destroy: DestroyRef = inject(DestroyRef);
    public isLoading$: Observable<boolean>;

    constructor(private _store: Store, private _elementRef: ElementRef, private _messageService: MessageService) {
        this.isLoading$ = this._store.select(AUTHENTICATION_SELECTORS.selectIsLoading).pipe(
            delay(300)
        );
    }

    ngOnInit(): void {
        this._store.select(AUTHENTICATION_SELECTORS.selectError).pipe(
            filter(value => value !== null),
            //  tap(value => { this._messageService.addMessage({ messageText: value, alert: 'warning' }) }),
            takeUntilDestroyed(this._destroy),
        ).subscribe()
    }

    ngAfterViewInit(): void {
        this._elementRef.nativeElement.classList.add('login-container');
    }

}