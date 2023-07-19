import { IPreferences } from "./interfaces";

export class UpdatePreferences {
    static readonly type = '[Preferences] UpdatePreference';
    constructor(public readonly preferences: IPreferences) {}
}

export class CreateNewPreferences {
    static readonly type = '[Preferences] CreateNewPreferences';
    constructor(public readonly profile: IPreferences) {}
}

export class ResetPreferences {
    static readonly type = '[Preferences] ResetPreferences';
}

export class RetrievePreferences {
    static readonly type = '[Preferences] RetrievePreferences';
    constructor(public readonly username: string) {}
}