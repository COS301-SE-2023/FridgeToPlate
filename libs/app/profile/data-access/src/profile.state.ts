import { Injectable } from "@angular/core";
import { IProfile, UpdateProfile, CreateNewProfile, RetrieveProfile } from "@fridge-to-plate/app/profile/utils";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { ProfileAPI } from "./profile.api";
import { ShowError } from "@fridge-to-plate/app/error/utils";

export interface ProfileStateModel {
    profile: IProfile | null;
}

@State<ProfileStateModel>({
    name: 'profile',
    defaults: {
        profile: {
            displayName: "John Doe",
            username: "jdoe",
            email: "jdoe@gmail.com",
            savedRecipes: [],
            ingredients: [],
            profilePic: "https://source.unsplash.com/150x150/?portrait",
            createdRecipes: [],
            currMealPlan: null
        }
    }
})

@Injectable()
export class ProfileState {

    constructor(private api: ProfileAPI, private store: Store) {}
    
    @Selector()
    static getProfile(state: ProfileStateModel) {
        return state.profile;
    }

    @Action(UpdateProfile)
    updateProfile({ patchState } : StateContext<ProfileStateModel>, { profile } : UpdateProfile) {
        patchState({
            profile: profile
        });
        this.api.updateProfile(profile);
    }

    @Action(CreateNewProfile)
    createNewProfile({ setState } : StateContext<ProfileStateModel>, { profile } : CreateNewProfile) {
        setState({
            profile: profile
        });
        this.api.saveProfile(profile);
    }

    @Action(RetrieveProfile)
    async retrieveProfile({ setState } : StateContext<ProfileStateModel>, { username } : RetrieveProfile) {
        (await this.api.getProfile(username)).subscribe({
            next: data => {
                setState({
                    profile: data
                });
            },
            error: error => {
                this.store.dispatch(new ShowError(error));
            }
        });
    }
}