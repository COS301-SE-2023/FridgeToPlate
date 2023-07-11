import { IPreferences } from "./interfaces";

export class UpdatePreferences {
    static readonly type = '[Preferences] UpdatePreference';
    constructor(public readonly preferences: IPreferences) {}
}