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
            ingredients: [
              {
                name: 'Tomato',
                amount: 2,
                unit: 'kg',
              },
              {
                name: 'Onion',
                amount: 1,
                unit: 'kg',
              },
              {
                name: 'Rice',
                amount: 3,
                unit: 'kg',
              },
              {
                name: 'Chicken',
                amount: 2,
                unit: 'kg',
              },
              {
                name: 'Rump Steak',
                amount: 3,
                unit: 'kg',
              },
              {
                name: 'Rice',
                amount: 3,
                unit: 'kg',
              },
              {
                name: 'Flour',
                amount: 2,
                unit: 'kg',
              },
              {
                name: 'Egg',
                amount: 500,
                unit: 'g',
              },
              {
                name: 'Peppers',
                amount: 2,
                unit: 'kg',
              },
              {
                name: 'Sunflower Oil',
                amount: 2,
                unit: 'l',
              },
              {
                name: 'Milk',
                amount: 4,
                unit: 'l',
              },
              {
                name: 'Soy Sauce',
                amount: 500,
                unit: 'ml',
              },
              {
                name: 'Beef Stock',
                amount: 200,
                unit: 'ml',
              },
              {
                name: 'Pasta',
                amount: 2,
                unit: 'kg',
              },
              {
                name: 'Salt',
                amount: 200,
                unit: 'g',
              },
              {
                name: 'Salmon',
                amount: 1,
                unit: 'kg',
              },
            ],
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
    
            this.store.dispatch(new UpdateProfile(updatedProfile));
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

            this.store.dispatch(new UpdateProfile(updatedProfile));
        }
    }
}
