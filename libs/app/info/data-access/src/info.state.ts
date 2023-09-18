import { Action, State, StateContext } from "@ngxs/store";
import { Injectable } from '@angular/core';
import { ShowInfo, ShowError, ShowSuccess } from "@fridge-to-plate/app/info/utils";
import { ToastController } from "@ionic/angular";

export interface InfoStateModel {
    info: string;
}

@State<InfoStateModel>({
    name: 'info',
    defaults: {
        info: ""
    }
})

@Injectable()
export class InfoState {

    constructor(private toastController: ToastController) {}

    @Action(ShowInfo)
    async showInfo({ patchState } : StateContext<InfoStateModel>, { info }: ShowInfo) {
        patchState({
            info: info
        });

        const toast = await this.toastController.create({
            message: info,
            color: 'medium',
            duration: 1000,
            position: 'bottom',
        });

        await toast.present();
    }

    @Action(ShowError)
    async showError({ patchState } : StateContext<InfoStateModel>, { error }: ShowError) {
        patchState({
            info: error
        });

        const toast = await this.toastController.create({
            message: error,
            color: 'danger',
            duration: 1000,
            position: 'bottom',
        });

        await toast.present();
    }

    @Action(ShowSuccess)
    async showSuccess({ patchState } : StateContext<InfoStateModel>, { success }: ShowSuccess) {
        patchState({
            info: success
        });

        const toast = await this.toastController.create({
            message: success,
            color: 'success',
            duration: 1000,
            position: 'bottom',
        });

        await toast.present();
    }
}