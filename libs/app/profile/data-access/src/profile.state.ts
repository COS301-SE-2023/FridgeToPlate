import { Injectable } from "@angular/core";
import { IProfile, UpdateProfile, CreateNewProfile, RetrieveProfile, SaveRecipe, RemoveRecipe, SortSavedByDifficulty, SortSavedByNameAsc, SortSavedByNameDesc, SortCreatedByDifficulty, SortCreatedByNameAsc } from "@fridge-to-plate/app/profile/utils";
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
                    difficulty: "Hard",
                    name: "The hard recipe",
                    tags: ["Tag"],
                },
                {
                    recipeId: "testid",
                    recipeImage: "testimage",
                    difficulty: "Medium",
                    name: "The med recipe",
                    tags: ["Tag"],
                },
                {
                    recipeId: "testid",
                    recipeImage: "testimage",
                    difficulty: "Easy",
                    name: "The easy recipe",
                    tags: ["Tag"],
                },
            ],
            ingredients: [],
            profilePic: "https://source.unsplash.com/150x150/?portrait",
            createdRecipes: [
                {
                    recipeId: "testid",
                    recipeImage: "testimage",
                    difficulty: "Easy",
                    name: "The recipe",
                    tags: ["Tag"],
                }
            ],
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

            this.api.updateProfile(updatedProfile);
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
    
            this.api.updateProfile(updatedProfile);
        }
    }

    @Action(SortSavedByDifficulty)
    sortSavedByDifficulty({ patchState, getState } : StateContext<ProfileStateModel>) {
        const updatedProfile = getState().profile;

        if (updatedProfile) {
            updatedProfile.savedRecipes.sort(function(a, b) {
                if (a.difficulty === b.difficulty) {
                    return 0;
                } else if (a.difficulty === 'Hard') {
                    return 1;
                } else if (a.difficulty === 'Medium' && b.difficulty === 'Easy') {
                    return 1;
                } else {
                    return -1;
                }
            });
            patchState({
                profile: updatedProfile
            });
        }
    }

    @Action(SortSavedByNameAsc)
    sortSavedByNameAsc({ patchState, getState } : StateContext<ProfileStateModel>) {
        const updatedProfile = getState().profile;

        if (updatedProfile) {
            updatedProfile.savedRecipes.sort(function(a, b) {
                if (a.name < b.name){
                    return -1;
                  }
                  if (a.name > b.name){
                    return 1;
                  }
                  return 0;
            });
            patchState({
                profile: updatedProfile
            });
        }
    }

    @Action(SortSavedByNameDesc)
    sortSavedByNameDesc({ patchState, getState } : StateContext<ProfileStateModel>) {
        const updatedProfile = getState().profile;

        if (updatedProfile) {
            
            updatedProfile.savedRecipes.sort(function(a, b) {
                if (a.name < b.name){
                    return 1;
                  }
                  if (a.name > b.name){
                    return -1;
                  }
                  return 0;
            });
            patchState({
                profile: updatedProfile
            });
        }
    }

    @Action(SortCreatedByDifficulty)
    sortCreatedByDifficulty({ patchState, getState } : StateContext<ProfileStateModel>) {
        const updatedProfile = getState().profile;

        if (updatedProfile) {
            updatedProfile.createdRecipes.sort(function(a, b) {
                if (a.difficulty === b.difficulty) {
                    return 0;
                } else if (a.difficulty === 'Hard') {
                    return 1;
                } else if (a.difficulty === 'Medium' && b.difficulty === 'Easy') {
                    return 1;
                } else {
                    return -1;
                }
            });
            patchState({
                profile: updatedProfile
            });
        }
    }

    @Action(SortCreatedByNameAsc)
    sortCreatedByNameAsc({ patchState, getState } : StateContext<ProfileStateModel>) {
        const updatedProfile = getState().profile;

        if (updatedProfile) {
            updatedProfile.createdRecipes.sort(function(a, b) {
                if (a.name < b.name){
                    return -1;
                  }
                  if (a.name > b.name){
                    return 1;
                  }
                  return 0;
            });
            patchState({
                profile: updatedProfile
            });
        }
    }

    @Action(SortSavedByNameDesc)
    sortCreatedByNameDesc({ patchState, getState } : StateContext<ProfileStateModel>) {
        const updatedProfile = getState().profile;

        if (updatedProfile) {
            
            updatedProfile.createdRecipes.sort(function(a, b) {
                if (a.name < b.name){
                    return 1;
                  }
                  if (a.name > b.name){
                    return -1;
                  }
                  return 0;
            });
            patchState({
                profile: updatedProfile
            });
        }
    }
}