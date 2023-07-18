import { Injectable } from "@angular/core";
import { IPreferences, UpdatePreferences } from "@fridge-to-plate/app/preferences/utils";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { PreferencesAPI } from "./preferences.api";

export interface PreferencesStateModel {
    preferences: IPreferences | null;
}

@State<PreferencesStateModel>({
    name: 'preferences',
    defaults: {
        preferences: {
            username: "jdoe",
            darkMode: false,
            recommendNotif: false,
            viewsNotif: false,
            reviewNotif: false,
        }
    }
})

@Injectable()
export class PreferencesState {

    constructor(private api: PreferencesAPI) {}

    @Selector()
    static getPreference(state: PreferencesStateModel) {
        return state.preferences;
    }

  @Selector()
  static get(state: PreferencesStateModel) {
    return state.preferences;
  }

    @Action(UpdatePreferences)
    updatePreference({ patchState } : StateContext<PreferencesStateModel>, { preferences } : UpdatePreferences) {
        patchState({
            preferences: preferences
        });
        this.api.updatePreference(preferences);
    }
}
