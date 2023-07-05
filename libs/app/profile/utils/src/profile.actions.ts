import { IProfile } from "./interfaces";

export class UpdateProfile {
    static readonly type = '[Profile] UpdateProfile';
    constructor(public readonly profile: IProfile) {}
}