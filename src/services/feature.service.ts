import { Inject, Injectable } from "@angular/core";

@Injectable()
export class FeatureService {

    constructor(@Inject('featureName') private _featureName: string) {

    }

    public getFeatureName(): string {
        return this._featureName;
    }
}