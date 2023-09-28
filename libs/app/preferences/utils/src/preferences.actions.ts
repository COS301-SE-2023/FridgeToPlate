import { IPreferences } from "./interfaces";

export class ChangePreference {
    static readonly type = '[Preferences] ChangePreference';
    constructor(public readonly preferenceName: string) {}
}

export class CreateNewPreferences {
    static readonly type = '[Preferences] CreateNewPreferences';
    constructor(public readonly preferences: IPreferences) {}
}

export class ResetPreferences {
    static readonly type = '[Preferences] ResetPreferences';
}

export class RetrievePreferences {
    static readonly type = '[Preferences] RetrievePreferences';
    constructor(public readonly username: string) {}
}