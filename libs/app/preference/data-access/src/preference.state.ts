import { Injectable } from "@angular/core";
import { IPreference, UpdatePreference } from "@fridge-to-plate/app/preference/utils";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { PreferenceAPI } from "./preference.api";

export interface PreferenceStateModel {
    preference: IPreference | null;
}

@State<PreferenceStateModel>({
    name: 'preference',
    defaults: {
        preference: {
            preferenceId: "1",
            username: "jdoe",
            darkMode: false,
            recommendNotification: false,
            viewsNotification: false,
            reviewsdNotification: false,
        }
    }
})

@Injectable()
export class PreferenceState {

    constructor(private api: PreferenceAPI) {}
    
    @Selector()
    static getPreference(state: PreferenceStateModel) {
        return state.preference;
    }

    @Action(UpdatePreference)
    updatePreference({ patchState } : StateContext<PreferenceStateModel>, { preference } : UpdatePreference) {
        patchState({
            preference: preference
        });
        this.api.updatePreference(preference);
    }
}