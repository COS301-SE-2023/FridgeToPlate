import { Injectable } from "@angular/core";
import { IProfile, UpdateProfile } from "@fridge-to-plate/app/profile/utils";
import { Action, Selector, State, StateContext } from "@ngxs/store";
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
            saved_recipes: [
                {
                    name: "Recipe",
                    recipeImage: "",
                    ingredients: [],
                    instructions: [],
                    difficulty: "Easy",
                }
            ],
            ingredients: [],
            profilePic: "",
            created_recipes: [],
            preferences: {
                darkMode: false,
                recommendNotifi: true,
                reviewNotifi: false,
                viewsNotifi: true,
            }
        }
    }
})

@Injectable()
export class ProfileState {

    constructor(private api: ProfileAPI) {}
    
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