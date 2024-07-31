import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, take, tap } from 'rxjs';
import { AUTHENTICATION_PAGE_ACTIONS } from 'src/authentication/store/authentication.actions';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'climbing-log';

  constructor(
    private _store: Store,
    private _router: Router,
    private _authService: AuthService
  ) {
    this._router.events.pipe(
      filter(ev => ev instanceof NavigationStart),
      map(ev => ev as NavigationStart),
      tap((ev: NavigationStart) => this._authService.setRequestedUrl(ev.url)),
      take(1),
    ).subscribe();
    this._store.dispatch(AUTHENTICATION_PAGE_ACTIONS.initAuthenticationStateFromStorage());
  }
}
