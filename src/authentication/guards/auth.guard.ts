import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, combineLatest, filter, map } from "rxjs";
import { AUTHENTICATION_SELECTORS } from "../store/authentication.selectors";

@Injectable()
export class AuthGuard {

    constructor(private _store: Store, private _router: Router) { }

    canActivate(): Observable<boolean | void> {
        return combineLatest([
            this._store.select(AUTHENTICATION_SELECTORS.selectToken),
            this._store.select(AUTHENTICATION_SELECTORS.selectInitFromStorageDone)
        ]).pipe(
            filter(([_, selectInitFromStorageDone]) => selectInitFromStorageDone),
            map(([token, _]) => {
                token ? true : this._router.navigate(['authentication/login']);
            })
        );
    }
}