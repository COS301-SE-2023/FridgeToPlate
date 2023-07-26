export class SignUp {
    static readonly type = '[Auth] SignUp';
    constructor(public readonly username: string, public readonly password: string, public readonly email: string) {}
}

export class Login {
    static readonly type = '[Auth] Login';
    constructor(public readonly username: string, public readonly password: string) {}
}

export class Logout {
    static readonly type = '[Auth] Logout';
}

export class Forgot {
    static readonly type = '[Auth] Forgot';
    constructor(public readonly username: string) {}
}

export class ChangePassword {
    static readonly type = '[Auth] ChangePassword';
    constructor(public readonly oldPassword: string, public readonly newPassword: string) {}
}

export class NewPassword {
    static readonly type = '[Auth] NewPassword';
    constructor(public readonly verificationCode: string, public readonly newPassword: string) {}
}