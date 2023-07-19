import { Action, State, StateContext, Store } from "@ngxs/store";
import { Injectable } from '@angular/core';
import { ToastController } from "@ionic/angular";
import { ShowUndo } from "@fridge-to-plate/app/undo/utils";

export interface UndoStateModel {
    undoText: string;
}

@State<UndoStateModel>({
    name: 'undo',
    defaults: {
        undoText: ""
    }
})

@Injectable()
export class UndoState {

    constructor(private toastController: ToastController, private store: Store) {}

    @Action(ShowUndo)
    async showError({ patchState } : StateContext<UndoStateModel>, { undoText, undoAction }: ShowUndo) {
        patchState({
            undoText: undoText
        });

        const toast = await this.toastController.create({
            message: undoText,
            duration: 2500,
            buttons: [{
                text: 'Undo',
                role: 'cancel',
                handler: () => {
                    this.store.dispatch(undoAction);
                },
              },],
            position: 'bottom',
        });

        await toast.present();
    }
}