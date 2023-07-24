import { Injectable } from "@angular/core";
import { IPreferences, UpdatePreferences, ResetPreferences, RetrievePreferences, CreateNewPreferences } from "@fridge-to-plate/app/preferences/utils";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { PreferencesAPI } from "./preferences.api";
import { ShowError } from "@fridge-to-plate/app/error/utils";

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

    constructor(private api: PreferencesAPI, private store: Store) {}


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

    @Action(ResetPreferences)
    resetPreferences({ setState } : StateContext<PreferencesStateModel>) {
        setState({
            preferences: null
        })
    }
    
    @Action(CreateNewPreferences)
    createNewPreferences({ setState } : StateContext<PreferencesStateModel>, { preferences } : CreateNewPreferences) {
        setState({
            preferences: preferences
        });
        this.api.savePreferences(preferences);
    }

    @Action(RetrievePreferences)
    async retrievePreferences({ setState } : StateContext<PreferencesStateModel>, { username } : RetrievePreferences) {
        (await this.api.getPreferences(username)).subscribe({
            next: data => {
                setState({
                    preferences: data
                });
            },
            error: error => {
                this.store.dispatch(new ShowError(error));
            }
        });
    }
}
