import { createAction, props } from '@ngrx/store';
import { SessionInfoT } from 'src/services/auth.service';
import { ClimbingUser } from 'src/utils/shared-values';
import { AUTHENTICATION_FEATURE } from './authentication.state';

export const AUTHENTICATION_PAGE_ACTIONS = {
    clickLogin: createAction(`[${AUTHENTICATION_FEATURE}] User Login`,
        props<{ username: string, password: string }>()
    ),
    clickRegister: createAction(`[${AUTHENTICATION_FEATURE}] User Registration`,
        props<{ name: string, lastname: string, username: string, password: string }>()
    ),
    initAuthenticationStateFromStorage: createAction(`[${AUTHENTICATION_FEATURE}] Init Login State`),
    refreshToken: createAction(`[${AUTHENTICATION_FEATURE}] Refresh Token`,
        props<{ token: string }>()
    ),
    updateLoggedUser: createAction(`[${AUTHENTICATION_FEATURE}] Update Logged User`)
};

export const AUTHENTICATION_API_ACTIONS = {
    authenticateSuccess: createAction(
        `[${AUTHENTICATION_FEATURE}] Authenticate Success`,
        props<SessionInfoT>()
    ),
    authenticateFailure: createAction(
        `[${AUTHENTICATION_FEATURE}] Authenticate Failure`,
        props<{ error: string }>()
    ),
    updateLoggedUserSuccess: createAction(
        `[${AUTHENTICATION_FEATURE}] Update Logged User Success`,
        props<{ user: ClimbingUser }>()
    ),
    updateLoggedUserFailure: createAction(
        `[${AUTHENTICATION_FEATURE}] Update Logged User Failure`,
        props<{ error: string }>()
    ),
};

