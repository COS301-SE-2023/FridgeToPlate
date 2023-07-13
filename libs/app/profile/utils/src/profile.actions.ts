import { IProfile } from "./interfaces";

export class UpdateProfile {
    static readonly type = '[Profile] UpdateProfile';
    constructor(public readonly profile: IProfile) {}
}

export class CreateNewProfile {
    static readonly type = '[Profile] CreateNewProfile';
    constructor(public readonly profile: IProfile) {}
}