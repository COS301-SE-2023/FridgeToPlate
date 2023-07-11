import { IProfile } from "./interfaces";

export class UpdateProfile {
    static readonly type = '[Profile] UpdateProfile';
    constructor(public readonly profile: IProfile) {}
}

export class StoreProfile {
    static readonly type = '[Profile] StoreProfile';
    constructor(public readonly profile: IProfile) {}
}