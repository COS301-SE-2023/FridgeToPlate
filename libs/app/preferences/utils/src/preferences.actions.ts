import { IPreferences } from "./interfaces";

export class UpdatePreferences {
    static readonly type = '[Preferences] UpdatePreference';
    constructor(public readonly preferences: IPreferences) {}
}

export class CreateNewPreference {
    static readonly type = '[Preferences] CreateNewPreference';
    constructor(public readonly profile: IPreferences) {}
}