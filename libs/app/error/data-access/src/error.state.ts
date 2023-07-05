import { Action, State, StateContext } from "@ngxs/store";
import { Injectable } from '@angular/core';
import { ShowError } from "@fridge-to-plate/app/error/utils";

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

    @Action(ShowError)
    showError({ patchState } : StateContext<ErrorStateModel>, { error }: ShowError) {
        patchState({
            error: error
        });

        //TO BE COMPLETED
    }
}