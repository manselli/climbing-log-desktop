import { createSelector } from '@ngrx/store';
import { AuthenticationState } from './authentication.state';

const selectAuthentication = (state: any): AuthenticationState => state.authentication;

export const AUTHENTICATION_SELECTORS = {
    selectToken: createSelector(
        selectAuthentication,
        (state) => state.token
    ),
    selectInitFromStorageDone: createSelector(
        selectAuthentication,
        (state) => state.initFromStorageDone
    ),

    selectError: createSelector(
        selectAuthentication,
        (state) => state.error
    ),

    selectIsLoading: createSelector(
        selectAuthentication,
        (state) => state.isLoading
    ),

    selectLoggedUser: createSelector(
        selectAuthentication,
        (state) => state.user
    ),
}

