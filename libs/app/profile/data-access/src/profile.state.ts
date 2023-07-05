import { Injectable } from "@angular/core";
import { IProfile, UpdateProfile } from "@fridge-to-plate/app/profile/utils";
import { Action, Selector, State, StateContext } from "@ngxs/store";

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
            saved_recipes: [],
            ingredients: [],
            profilePic: "",
            created_recipes: [],
        }
    }
})

@Injectable()
export class ProfileState {
    
    @Selector()
    static getProfile(state: ProfileStateModel) {
        return state.profile;
    }

    @Action(UpdateProfile)
    updateProfile({ patchState } : StateContext<ProfileStateModel>, { profile } : UpdateProfile) {
        patchState({
            profile: profile
        })
    }
}