import { Injectable } from "@angular/core";
import { AddIngredient, IProfile, RemoveIngredient, UpdateProfile } from "@fridge-to-plate/app/profile/utils";
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

    @Action(RemoveIngredient)
    removeIngredient({ patchState, getState } : StateContext<ProfileStateModel>, { ingredient } : RemoveIngredient) {
        const updatedProfile = getState().profile;
        
        if (updatedProfile) {
            updatedProfile.ingredients = updatedProfile.ingredients.filter((item) => {
                return item.name !== ingredient.name;
            });
            patchState({
                profile: updatedProfile
            });
    
            //CALL API
        }
    }

    @Action(AddIngredient)
    addIngredient({ patchState, getState } : StateContext<ProfileStateModel>, { ingredient } : AddIngredient) {
        const updatedProfile = getState().profile;
        
        if (updatedProfile) {
            for (let i = 0; i < updatedProfile.ingredients.length; i++) {
                if (updatedProfile.ingredients[i].name === ingredient.name) {
                    this.store.dispatch(new ShowError("Ingredient Already Added"));
                    return;
                }
            }
            
            updatedProfile?.ingredients.push(ingredient);
            patchState({
                profile: updatedProfile
            });

            //CALL API
        }
    }
}