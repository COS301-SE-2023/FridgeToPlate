import { Injectable } from "@angular/core";
import { IProfile, UpdateProfile, CreateNewProfile, RetrieveProfile, SaveRecipe, RemoveRecipe } from "@fridge-to-plate/app/profile/utils";
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
            savedRecipes: [
                {
                    recipeId: "testid",
                    recipeImage: "testimage",
                    difficulty: "Easy",
                    name: "The recipe",
                    tags: [],
                }
            ],
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

    @Action(SaveRecipe)
    saveRecipe({ patchState, getState } : StateContext<ProfileStateModel>, { recipe } : SaveRecipe) {
        const updatedProfile = getState().profile;
        
        if (updatedProfile) {
            for (let i = 0; i < updatedProfile.savedRecipes.length; i++) {
                if (updatedProfile.savedRecipes[i].recipeId === recipe.recipeId) {
                    this.store.dispatch(new ShowError("Recipe Already Stored"));
                    return;
                }
            }
            
            updatedProfile?.savedRecipes.push(recipe);
            patchState({
                profile: updatedProfile
            });

            //CALL API
        }
    }

    @Action(RemoveRecipe)
    removeRecipe({ patchState, getState } : StateContext<ProfileStateModel>, { recipe } : RemoveRecipe) {
        const updatedProfile = getState().profile;
        
        if (updatedProfile) {
            updatedProfile.savedRecipes = updatedProfile.savedRecipes.filter((savedRecipe) => {
                return savedRecipe.recipeId !== recipe.recipeId;
            });
            patchState({
                profile: updatedProfile
            });
    
            //CALL API
        }
    }
}