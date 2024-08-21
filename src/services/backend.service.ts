import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "./auth.service";

export type HttpCallOptions = {
    useCompanyHeader: boolean,
    useEnterpriseCompanyHeader?: boolean,
    extraHeaders?: { key: string, value: string }[],
}

@Injectable()
export class BackendService {
    private readonly _baseUrl = environment.apiUrl;
    private readonly _defaultOptsValue = {
        useCompanyHeader: true,
        useEnterpriseCompanyHeader: true,
    }

    constructor(private _http: HttpClient, private _authService: AuthService, private _store: Store) {
    }

    public get<T>(endpoint: string, opts: HttpCallOptions = this._defaultOptsValue): Observable<T> {
        const headers = this.calculateHeaders(opts);
        return this._http.get<T>(`${this._baseUrl}/${endpoint}`, {
            headers: headers,
        });
    }


    public getFullResponse<T>(endpoint: string, opts: HttpCallOptions = this._defaultOptsValue): Observable<HttpResponse<T>> {
        const headers = this.calculateHeaders(opts);

        return this._http.get<T>(`${this._baseUrl}/${endpoint}`, {
            headers: headers,
            observe: 'response',

        });
    }


    public post<T>(endpoint: string, body: any, opts: HttpCallOptions = this._defaultOptsValue): Observable<T> {
        const headers = this.calculateHeaders(opts);

        return this._http.post<T>(`${this._baseUrl}/${endpoint}`, body, {
            headers: headers
        });
    }

    public postFullResponse<T>(endpoint: string, body: any, opts: HttpCallOptions = this._defaultOptsValue): Observable<HttpResponse<T>> {
        const headers = this.calculateHeaders(opts);

        return this._http.post<T>(`${this._baseUrl}/${endpoint}`, body, {
            headers: headers,
            observe: 'response'
        });
    }

    public patch<T>(endpoint: string, etag: string, body: any, opts: HttpCallOptions = this._defaultOptsValue): Observable<T> {
        const headers = this.calculateHeaders(opts, etag);

        return this._http.patch<T>(`${this._baseUrl}/${endpoint}`, body, {
            headers: headers
        });
    }

    public delete<T>(endpoint: string, etag: string, opts: HttpCallOptions = this._defaultOptsValue): Observable<T> {
        const headers = this.calculateHeaders(opts, etag);

        return this._http.delete<T>(`${this._baseUrl}/${endpoint}`, {
            headers: headers
        });
    }

    private calculateHeaders(opts: HttpCallOptions, etag?: string): HttpHeaders | {
        [header: string]: string | string[];
    } {

        const token = this._authService.getSessionInfo()?.accessToken;

        const headers: HttpHeaders | {
            [header: string]: string | string[];
        } = {
            "Authorization": `Bearer ${token}`,
        }
        if (opts.extraHeaders) {
            opts.extraHeaders.forEach(elm => headers[elm.key] = elm.value)
        }
        if (etag) {
            headers["if-match"] = etag;
        }
        return headers
    }
}