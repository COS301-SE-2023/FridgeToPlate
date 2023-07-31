import { Action, State, StateContext } from "@ngxs/store";
import { Injectable } from '@angular/core';
import { ShowError } from "@fridge-to-plate/app/error/utils";
import { ToastController } from "@ionic/angular";

export interface ErrorStateModel {
    error: string;
}

@State<ErrorStateModel>({
    name: 'error',
    defaults: {
        error: ""
    }
})

@Injectable()
export class ErrorState {

    constructor(private toastController: ToastController) {}

    @Action(ShowError)
    async showError({ patchState } : StateContext<ErrorStateModel>, { error }: ShowError) {
        patchState({
            error: error
        });

        const toast = await this.toastController.create({
            message: "ERROR: " + error,
            color: 'danger',
            duration: 2500,
            position: 'bottom',
        });

        await toast.present();
    }
}