import { Injectable } from "@angular/core";

@Injectable()
export class LocalStorageService {

    getItem(key: string) {
        return window.localStorage.getItem(key)
    }
    setItem(key: string, value: string) {
        window.localStorage.setItem(key, value)
    }
}