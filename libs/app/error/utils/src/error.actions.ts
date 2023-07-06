export class ShowError {
    static readonly type = '[Errors] ShowError';
    constructor(public readonly error: string) {}
  }
  