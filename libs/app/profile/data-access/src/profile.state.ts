import { Injectable } from "@angular/core";
import { IProfile, UpdateProfile } from "@fridge-to-plate/app/profile/utils";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { ProfileAPI } from "./profile.api";

export interface ProfileStateModel {
    profile: IProfile | null;
}

@State<ProfileStateModel>({
    name: 'profile',
    defaults: {
        profile: {
            profileId: "1",
            displayName: "John Doe",
            username: "jdoe",
            email: "jdoe@gmail.com",
            savedRecipes: [],
            ingredients: [],
            profilePic: "",
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
}
