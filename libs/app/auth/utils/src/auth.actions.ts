export class SignUp {
    static readonly type = '[Auth] SignUp';
    constructor(public readonly username: string, public readonly password: string, public readonly email: string) {}
}

export class Login {
    static readonly type = '[Auth] Login';
    constructor(public readonly username: string, public readonly password: string) {}
}