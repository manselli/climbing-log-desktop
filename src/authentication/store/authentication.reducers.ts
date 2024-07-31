import { createReducer, on } from "@ngrx/store";
import { AUTHENTICATION_API_ACTIONS, AUTHENTICATION_PAGE_ACTIONS } from "./authentication.actions";
import { initInitialAuthenticationState } from "./authentication.state";

export const authenticationReducer = createReducer(
    initInitialAuthenticationState(),
    on(AUTHENTICATION_PAGE_ACTIONS.clickLogin, state => ({ ...state, isLoading: true })),
    on(AUTHENTICATION_PAGE_ACTIONS.clickRegister, state => ({ ...state, isLoading: true })),
    on(AUTHENTICATION_PAGE_ACTIONS.refreshToken, (state, { token }) => ({ ...state, token, isLoading: true })),
    on(AUTHENTICATION_API_ACTIONS.authenticateSuccess, (state, { accessToken, user }) => ({
        ...state,
        token: accessToken,
        user,
        isLoading: false,
        initFromStorageDone: true,
    })),
    on(AUTHENTICATION_API_ACTIONS.authenticateFailure, (state, { error }) => ({ ...state, error, isLoading: false, initFromStorageDone: true })),

    on(AUTHENTICATION_API_ACTIONS.updateLoggedUserSuccess, (state, { user }) => ({ ...state, user, })),
    on(AUTHENTICATION_API_ACTIONS.updateLoggedUserFailure, (state, { error }) => ({ ...state, error })),

);