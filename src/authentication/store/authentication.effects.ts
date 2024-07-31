import { DestroyRef, Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AuthService } from 'src/services/auth.service';
import { BackendService } from 'src/services/backend.service';
import { ClimbingUser } from 'src/utils/shared-values';
import { AUTHENTICATION_API_ACTIONS, AUTHENTICATION_PAGE_ACTIONS } from './authentication.actions';
@Injectable()
export class AuthenticationEffects {
    private readonly _destroy: DestroyRef = inject(DestroyRef);

    constructor(
        private actions$: Actions,
        private _authService: AuthService,
        private _router: Router,
        private _backendService: BackendService,
        private _store: Store,) { }

    loadAuthenticationState = createEffect(() =>
        this.actions$.pipe(
            ofType(AUTHENTICATION_PAGE_ACTIONS.initAuthenticationStateFromStorage),
            withLatestFrom(
                of(window.localStorage.getItem('accessToken')),
                of(window.localStorage.getItem('email')),
                of(window.localStorage.getItem('idToken')),
                of(window.localStorage.getItem('refreshToken')),
                of(window.localStorage.getItem('user')),
            ),
            switchMap(([_, token, email, idToken, refreshToken, user]) =>
                this._authService.checkToken({ accessToken: token, email, idToken, refreshToken }).pipe(
                    map(_ => AUTHENTICATION_API_ACTIONS.authenticateSuccess({
                        accessToken: token,
                        email: email,
                        idToken: idToken,
                        refreshToken: refreshToken,
                        user: user ? (JSON.parse(user) as ClimbingUser) : null,
                    })),
                    catchError(_ => of(AUTHENTICATION_API_ACTIONS.authenticateFailure({ error: 'no token' })))
                )
            )));

    handleLogin = createEffect(() =>
        this.actions$.pipe(
            ofType(AUTHENTICATION_PAGE_ACTIONS.clickLogin),
            switchMap(({ username, password }) =>
                this._authService.login(username, password).pipe(
                    map(sessionInfo => AUTHENTICATION_API_ACTIONS.authenticateSuccess(sessionInfo)),
                    catchError(error => of(AUTHENTICATION_API_ACTIONS.authenticateFailure({ error })))
                )
            )
        )
    );

    handleRegister = createEffect(() =>
        this.actions$.pipe(
            ofType(AUTHENTICATION_PAGE_ACTIONS.clickRegister),
            switchMap(({ name, lastname, username, password }) =>
                this._authService.register(name, lastname, username, password).pipe(
                    map(sessionInfo => AUTHENTICATION_API_ACTIONS.authenticateSuccess(sessionInfo)),
                    catchError(error => of(AUTHENTICATION_API_ACTIONS.authenticateFailure({ error })))
                )
            )
        )
    );

    updateLoggedUser = createEffect(() =>
        this.actions$.pipe(
            ofType(AUTHENTICATION_PAGE_ACTIONS.updateLoggedUser),
            switchMap(() =>
                this._backendService.get<{ user: ClimbingUser }>(`users/me`, { useCompanyHeader: false }).pipe(
                    map(response => AUTHENTICATION_API_ACTIONS.updateLoggedUserSuccess(response)),
                    catchError(error => of(AUTHENTICATION_API_ACTIONS.updateLoggedUserFailure({ error })))
                )
            )
        )
    );

    updateLoggedUserSuccess = createEffect(() =>
        this.actions$.pipe(
            ofType(AUTHENTICATION_API_ACTIONS.updateLoggedUserSuccess),
            tap((user) => {
                window.localStorage.setItem('user', JSON.stringify(user.user));
            })
        ), {
        dispatch: false
    }
    );

    handleLoginSuccess = createEffect(() =>
        this.actions$.pipe(
            ofType(AUTHENTICATION_API_ACTIONS.authenticateSuccess),
            tap(({ accessToken, email, idToken, refreshToken, user }) => {
                this._authService.setSessionInfo({ accessToken, email, idToken, refreshToken, user });
                this._authService.startRefreshTokenTimer();
            }),
            tap(_ => {
                this._router.navigate([this._authService.getRequestedUrl().includes('login') ? 'dashboard' : this._authService.getRequestedUrl()]);
            })
        ),
        {
            dispatch: false
        }
    );

    handleLoginError = createEffect(() =>
        this.actions$.pipe(
            ofType(AUTHENTICATION_API_ACTIONS.authenticateFailure),
            tap(_ => this._router.navigate(['authentication/registration']))
        ),
        {
            dispatch: false
        }
    );

}