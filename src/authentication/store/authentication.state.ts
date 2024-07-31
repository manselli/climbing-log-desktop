import { ClimbingUser } from "../../utils/shared-values";

export interface AuthenticationState {
    token: string | null;
    error: string | null;
    isLoading: boolean;
    initFromStorageDone: boolean;
    user: ClimbingUser | null;
}

export const initInitialAuthenticationState = (): AuthenticationState => ({
    token: null,
    error: null,
    isLoading: false,
    initFromStorageDone: false,
    user: null,
});

export const AUTHENTICATION_FEATURE = 'authenticationFeature';