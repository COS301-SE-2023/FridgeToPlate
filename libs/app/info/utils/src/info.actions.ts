export class ShowInfo {
    static readonly type = '[Infos] ShowInfo';
    constructor(public readonly info: string) {}
}

export class ShowError {
  static readonly type = '[Errors] ShowError';
  constructor(public readonly error: string) {}
}