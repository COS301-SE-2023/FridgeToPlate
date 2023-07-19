export class ShowUndo {
    static readonly type = '[Undo] ShowUndo';
    constructor(public readonly undoText: string, public readonly undoAction: any) {}
}