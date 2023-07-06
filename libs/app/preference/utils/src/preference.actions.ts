import { IPreference } from "./interfaces";

export class UpdatePreference {
    static readonly type = '[Preference] UpdatePreference';
    constructor(public readonly preference: IPreference) {}
}