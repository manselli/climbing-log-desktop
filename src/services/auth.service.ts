

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthenticationDetails, CognitoAccessToken, CognitoIdToken, CognitoRefreshToken, CognitoUser, CognitoUserAttribute, CognitoUserPool, CognitoUserSession, ICognitoUserAttributeData, ICognitoUserSessionData, ISignUpResult } from "amazon-cognito-identity-js";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { Observable, firstValueFrom, from } from "rxjs";
import { AUTHENTICATION_PAGE_ACTIONS } from "src/authentication/store/authentication.actions";
import { environment } from "../environments/environment.development";
import { ClimbingUser } from "../utils/shared-values";

export const cognitoUserPoolId = environment.cognitoUserPool
export const cognitoClientId = environment.cognitoClientId

export type SessionInfoT = {
    accessToken: string,
    idToken: string,
    email: string,
    refreshToken: string,
    user: ClimbingUser,
}
@Injectable()
export class AuthService {
    private readonly _baseUrl = environment.apiUrl;

    private _requestedUrl: string;
    private _cognitoUser: CognitoUser;
    private _refreshInterval: NodeJS.Timeout;
    private readonly TOKEN_TIMEOUT = 55 * 60 * 1000;//55 min

    private _sessionInfo: SessionInfoT;

    constructor(private _http: HttpClient, private _store: Store) { }

    public login(email: string, password: string): Observable<{ accessToken: string, email: string, idToken: string, refreshToken: string, user: ClimbingUser }> {
        const authenticationData = {
            Username: email,
            Password: password,
        };
        const authenticationDetails = new AuthenticationDetails(
            authenticationData
        );
        const poolData = {
            UserPoolId: cognitoUserPoolId,//'us-east-1_Si9n5QY8O', // Your user pool id here
            ClientId: cognitoClientId//"4mjv2dh1b5pa622l0vsm1d7q3e" // Your client id here
        };
        const userPool = new CognitoUserPool(poolData);
        const userData = {
            Username: email,
            Pool: userPool,
        };
        this._cognitoUser = new CognitoUser(userData);
        const loginPromise = new Promise<{ accessToken: string, email: string, idToken: string, refreshToken: string, user: ClimbingUser }>(async (resolve, reject) => {
            this._cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: async (result) => {
                    const accessToken = result.getAccessToken().getJwtToken();
                    const idToken = result.getIdToken().getJwtToken();
                    const refreshToken = result.getRefreshToken().getToken();
                    try {
                        const user = (await firstValueFrom(this.get<{ user: ClimbingUser }>('users/me', result.getAccessToken().getJwtToken()))).user;
                        /*if (user.companyAccesses.length === 0) {
                            reject('User has no company access');
                        }*/
                        resolve({
                            accessToken: accessToken,
                            email: email,
                            idToken: idToken,
                            refreshToken: refreshToken,
                            user: user
                        });

                    } catch (err) {
                        resolve({
                            accessToken: accessToken,
                            email: email,
                            idToken: idToken,
                            refreshToken: refreshToken,
                            user: null
                        });

                    }
                },
                onFailure: function (err) {
                    reject(err.message || JSON.stringify(err));
                },
            });
        })
        return from(loginPromise);
    }

    public register(name: string, lastName: string, email: string, password: string): Observable<{ accessToken: string, email: string, idToken: string, refreshToken: string, user: ClimbingUser }> {
        const poolData = {
            UserPoolId: cognitoUserPoolId,//'us-east-1_Si9n5QY8O', // Your user pool id here
            ClientId: cognitoClientId//"4mjv2dh1b5pa622l0vsm1d7q3e" // Your client id here
        };
        const userPool = new CognitoUserPool(poolData);

        const attributeList: CognitoUserAttribute[] = [];
        const marketingConsent: ICognitoUserAttributeData = {
            Name: 'custom:marketingConsent',
            Value: 'true',
        };
        const attributeMarketingConsent = new CognitoUserAttribute(marketingConsent);
        attributeList.push(attributeMarketingConsent);
        const policyConsent: ICognitoUserAttributeData = {
            Name: 'custom:policyConsent',
            Value: 'true',
        };
        const attributePolicyConsent = new CognitoUserAttribute(policyConsent);
        attributeList.push(attributePolicyConsent);

        const registrationPromise = new Promise<{ accessToken: string, email: string, idToken: string, refreshToken: string, user: ClimbingUser }>(async (resolve, reject) => {
            userPool.signUp(email, password, attributeList, null, (err: Error, result: ISignUpResult) => {
                if (err) {
                    reject(err.message)
                }
                const authenticationData = {
                    Username: email,
                    Password: password,
                };
                const authenticationDetails = new AuthenticationDetails(
                    authenticationData
                );
                this._cognitoUser = result.user;
                this._cognitoUser.authenticateUser(authenticationDetails, {
                    onSuccess: async (result) => {
                        const accessToken = result.getAccessToken().getJwtToken();
                        const idToken = result.getIdToken().getJwtToken();
                        const refreshToken = result.getRefreshToken().getToken();
                        try {
                            const user = (await firstValueFrom(this.patch<{ user: ClimbingUser }>('users/me', accessToken, { name, lastName }))).user;
                            //console.log(user.companyAccesses);
                            /*
                            if (user.companyAccesses.length === 0) {
                                reject('User has no company access');
                            }*/
                            resolve({
                                accessToken: accessToken,
                                email: email,
                                idToken: idToken,
                                refreshToken: refreshToken,
                                user: user
                            });

                        } catch (err) {
                            resolve({
                                accessToken: accessToken,
                                email: email,
                                idToken: idToken,
                                refreshToken: refreshToken,
                                user: null
                            });

                        }
                    },
                    onFailure: function (err) {
                        console.log('authenticate failure')
                        reject(err.message || JSON.stringify(err));
                    },
                });

            })
        })
        return from(registrationPromise);
    }

    public startRefreshTokenTimer() {
        const sessionInfo = this.getSessionInfo();
        const refreshToken = new CognitoRefreshToken({ RefreshToken: sessionInfo.refreshToken });
        this.refreshToken();
        if (!this._refreshInterval) {
            this._refreshInterval = setInterval(() => {
                this.refreshToken();
            }, this.TOKEN_TIMEOUT);
        }
    }

    private refreshToken() {
        const sessionInfo = this.getSessionInfo();
        const refreshToken = new CognitoRefreshToken({ RefreshToken: sessionInfo.refreshToken });
        this._cognitoUser.refreshSession(refreshToken, (err: Error, session: CognitoUserSession) => {
            if (err) {
                console.log(err);
            } else {
                this._store.dispatch(AUTHENTICATION_PAGE_ACTIONS.refreshToken({ token: session.getAccessToken().getJwtToken() }));
                this.setSessionInfo({
                    ...sessionInfo,
                    accessToken: session.getAccessToken().getJwtToken(),
                    idToken: session.getIdToken().getJwtToken(),
                    refreshToken: session.getRefreshToken().getToken(),
                });
            }
        })

    }

    public logout() {
        if (this._cognitoUser) {
            this._cognitoUser.signOut();
            this.setSessionInfo(null);
            clearInterval(this._refreshInterval);
            this._cognitoUser = undefined;
            window.location.reload();
        }
    }

    public checkToken(sessionInfo: Omit<SessionInfoT, 'user'>): Observable<boolean> {
        const verifier = CognitoJwtVerifier.create({
            userPoolId: cognitoUserPoolId,
            tokenUse: "access",
            clientId: cognitoClientId,
        });
        const checkPromise = new Promise<boolean>(async (resolve, reject) => {
            try {
                const payload = await verifier.verify(
                    sessionInfo.accessToken // the JWT as string
                );
                this._checkCognitoUser(sessionInfo);
                resolve(true);
            } catch {
                reject(false);
            }
        });
        return from(checkPromise);
    }

    public getSessionInfo(): SessionInfoT {
        return this._sessionInfo;
    }

    public setSessionInfo(sessionInfo: SessionInfoT): void {
        this._sessionInfo = sessionInfo;
        this._saveSessionDataLocally(sessionInfo);
    }

    private _checkCognitoUser(sessionInfo: Omit<SessionInfoT, 'user'>) {
        if (!this._cognitoUser) {
            this._cognitoUser = new CognitoUser({
                Username: sessionInfo.email,
                Pool: new CognitoUserPool({
                    UserPoolId: cognitoUserPoolId,
                    ClientId: cognitoClientId
                })
            });
            const cognitoSessionData: ICognitoUserSessionData = {
                IdToken: new CognitoIdToken({ IdToken: sessionInfo.idToken }),
                AccessToken: new CognitoAccessToken({ AccessToken: sessionInfo.accessToken }),
                RefreshToken: new CognitoRefreshToken({ RefreshToken: sessionInfo.refreshToken }),
            }
            this._cognitoUser.setSignInUserSession(new CognitoUserSession(cognitoSessionData))
        }
    }

    private _saveSessionDataLocally(sessionInfo: SessionInfoT | null) {
        window.localStorage.setItem('accessToken', sessionInfo?.accessToken);
        window.localStorage.setItem('email', sessionInfo?.email);
        window.localStorage.setItem('idToken', sessionInfo?.idToken);
        window.localStorage.setItem('refreshToken', sessionInfo?.refreshToken);
        window.localStorage.setItem('user', JSON.stringify(sessionInfo?.user));
    }

    public getRequestedUrl(): string {
        return this._requestedUrl;
    }

    public setRequestedUrl(url: string): void {
        this._requestedUrl = url;
    }

    public changeUserPassword(oldPassword: string, newPassword: string): Observable<string> {
        return new Observable<string>((subscriber) => {
            this._cognitoUser.changePassword(oldPassword, newPassword, (err, res) => {
                if (err) {
                    console.log(err)
                    subscriber.next(err.message)
                } else {
                    subscriber.next(res)
                }
            })
        }
        )
    }


    private get<T>(endpoint: string, accessToken: string): Observable<T> {
        return this._http.get<T>(`${this._baseUrl}/${endpoint}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
    }
    private patch<T>(endpoint: string, accessToken: string, body: any): Observable<T> {
        return this._http.patch<T>(`${this._baseUrl}/${endpoint}`, body, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
    }

}