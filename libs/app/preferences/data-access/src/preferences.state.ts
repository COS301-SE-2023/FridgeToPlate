import { Injectable } from "@angular/core";
import { IPreferences, ChangePreference, ResetPreferences, RetrievePreferences, CreateNewPreferences } from "@fridge-to-plate/app/preferences/utils";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { PreferencesAPI } from "./preferences.api";
import { ShowError } from "@fridge-to-plate/app/error/utils";
import { environment } from "@fridge-to-plate/app/environments/utils";

export interface PreferencesStateModel {
    preferences: IPreferences | null;
}

@State<PreferencesStateModel>({
    name: 'preferences',
    defaults: {
        preferences: environment.TYPE === "production" ? null : {
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

    @Action(ChangePreference)
    updatePreference({ patchState, getState } : StateContext<PreferencesStateModel>, { preferenceName } : ChangePreference) {
        const preferences = getState().preferences;

        if (preferences) {
            
            switch (preferenceName) {
                case "darkMode":
                    preferences.darkMode = !preferences.darkMode;
                    // eslint-disable-next-line no-case-declarations
                    const body = document.querySelector("html");
		
                    if (body) {

                        if(preferences.darkMode == true){
                            body.setAttribute('data-theme', "dark"); 
                            body.classList.add("dark");
                        } else {
                            body.setAttribute('data-theme', "light");
                            body.classList.remove("dark");
                        }

                    }

                    break;
                case "recommendNotif":
                    preferences.recommendNotif = !preferences.recommendNotif;
                    break;
                case "reviewNotif":
                    preferences.reviewNotif = !preferences.reviewNotif;
                    break;
                case "viewsNotif":
                    preferences.viewsNotif = !preferences.viewsNotif;
                    break;
            }

            patchState({
                preferences: preferences
            });
            this.api.updatePreference(preferences);
        }
        
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
                this.store.dispatch(new ShowError("An Rrror Occurred While Retrieveing Your Preferences"));
            }
        });
    }
}
