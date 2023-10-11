import { Injectable } from '@angular/core';
import {
  IProfile,
  UpdateProfile,
  CreateNewProfile,
  RetrieveProfile,
  SaveRecipe,
  RemoveSavedRecipe,
  SortSavedByDifficulty,
  SortSavedByNameAsc,
  SortSavedByNameDesc,
  SortCreatedByDifficulty,
  SortCreatedByNameAsc,
  ResetProfile,
  UndoRemoveSavedRecipe,
  UpdateMealPlan,
  RemoveFromMealPlan,
  AddToMealPlan,
  AddCreatedRecipe,
  RetrieveMealPlan,
  OpenSettings,
  CloseSettings,
} from '@fridge-to-plate/app/profile/utils';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { ProfileAPI } from './profile.api';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { ShowUndo } from '@fridge-to-plate/app/undo/utils';
import { MealPlanAPI } from '@fridge-to-plate/app/meal-plan/data-access';
import { environment } from '@fridge-to-plate/app/environments/utils';
import { RetrieveMealPlanIngredients } from '@fridge-to-plate/app/recipe/utils';
import { UpdateMealPlanData } from '@fridge-to-plate/app/meal-plan/utils';
import { ShowInfo, ShowSuccess } from '@fridge-to-plate/app/info/utils';

export interface ProfileStateModel {
  profile: IProfile | null;
}

export interface SettingsStateModel {
  settings: string;
}

@State<ProfileStateModel>({
  name: 'profile',
  defaults: {
    profile:
      environment.TYPE === 'production'
        ? null
        : {
            displayName: 'John Doe',
            username: 'jdoe',
            email: 'jdoe@gmail.com',
            savedRecipes: [],
            ingredients: [],
            profilePic: 'https://source.unsplash.com/150x150/?portrait',
            createdRecipes: [
              {
                recipeId: 'b6df9e16-4916-4869-a7d9-eb0293142f1f',
                recipeImage: 'https://source.unsplash.com/800x800/?food',
                name: 'Delicious Pasta',
                tags: ['pasta', 'Italian', 'dinner'],
                difficulty: 'Easy',
                rating: null,
              },
              {
                recipeId: 'b6df9e16-4916-4869-a7d9-eb0293142f1f22',
                recipeImage: 'https://source.unsplash.com/800x800/?food',
                name: 'Cheesy Meal',
                tags: ['pasta', 'Italian', 'dinner'],
                difficulty: 'Easy',
                rating: 4.5,
              },
            ],
            currMealPlan: null,
          },
  },
})
@State<SettingsStateModel>({
  name: 'settings',
  defaults: {
    settings: 'none',
  },
})
@Injectable()
export class ProfileState {
  constructor(
    private profileAPI: ProfileAPI,
    private store: Store,
    private readonly mealPlanAPI: MealPlanAPI
  ) {}

  @Selector()
  static getProfile(state: ProfileStateModel) {
    return state.profile;
  }

  @Selector()
  static getSettings(state: SettingsStateModel) {
    return state.settings;
  }

  @Action(UpdateProfile)
  updateProfile(
    { patchState }: StateContext<ProfileStateModel>,
    { profile }: UpdateProfile
  ) {
    patchState({
      profile: profile,
    });
    this.profileAPI.updateProfile(profile);
  }

  @Action(ResetProfile)
  resetProfile({ setState }: StateContext<ProfileStateModel>) {
    setState({
      profile: null,
    });
  }

  @Action(CreateNewProfile)
  createNewProfile(
    { setState }: StateContext<ProfileStateModel>,
    { profile }: CreateNewProfile
  ) {
    setState({
      profile: profile,
    });
    this.profileAPI.saveProfile(profile);
  }

  @Action(RetrieveProfile)
  async retrieveProfile(
    { setState }: StateContext<ProfileStateModel>,
    { username }: RetrieveProfile
  ) {
    (await this.profileAPI.getProfile(username)).subscribe({
      next: (data) => {
        setState({
          profile: data,
        });
        if (data?.currMealPlan)
          this.store.dispatch(new UpdateMealPlan(data?.currMealPlan));
      },
      error: (error) => {
        this.store.dispatch(new ShowError('Unsuccessful'));
      },
    });
  }

  @Action(AddCreatedRecipe)
  addCreatedRecipe(
    { patchState, getState }: StateContext<ProfileStateModel>,
    { recipe }: AddCreatedRecipe
  ) {
    const updatedProfile = getState().profile;

    if (updatedProfile) {
      updatedProfile?.createdRecipes.unshift(recipe);
      patchState({
        profile: updatedProfile,
      });

      this.profileAPI.updateProfile(updatedProfile);
    }
  }

  @Action(SaveRecipe)
  saveRecipe(
    { patchState, getState }: StateContext<ProfileStateModel>,
    { recipe }: SaveRecipe
  ) {
    const updatedProfile = getState().profile;

    if (updatedProfile) {
      for (let i = 0; i < updatedProfile.savedRecipes.length; i++) {
        if (updatedProfile.savedRecipes[i].recipeId === recipe.recipeId) {
          this.store.dispatch(new ShowInfo('Recipe Already Stored'));
          return;
        }
      }

      updatedProfile?.savedRecipes.push(recipe);
      patchState({
        profile: updatedProfile,
      });

      this.profileAPI.updateProfile(updatedProfile);
      this.store.dispatch(new ShowInfo('Recipe Saved To Profile'));
    } else {
      this.store.dispatch(
        new ShowError('You Must Be Logged In To Save Recipes')
      );
    }
  }

  @Action(RemoveSavedRecipe)
  removeSavedRecipe(
    { patchState, getState }: StateContext<ProfileStateModel>,
    { recipe }: RemoveSavedRecipe
  ) {
    const updatedProfile = getState().profile;

    if (updatedProfile) {
      this.store.dispatch(
        new ShowUndo(
          'Removed recipe from saved recipes',
          new UndoRemoveSavedRecipe(updatedProfile.savedRecipes)
        )
      );

      updatedProfile.savedRecipes = updatedProfile.savedRecipes.filter(
        (savedRecipe) => {
          return savedRecipe.recipeId !== recipe.recipeId;
        }
      );
      patchState({
        profile: updatedProfile,
      });

      this.profileAPI.updateProfile(updatedProfile);
    }
  }

  @Action(UndoRemoveSavedRecipe)
  undoRemoveSavedRecipe(
    { patchState, getState }: StateContext<ProfileStateModel>,
    { savedRecipes }: UndoRemoveSavedRecipe
  ) {
    const updatedProfile = getState().profile;

    if (updatedProfile) {
      updatedProfile.savedRecipes = savedRecipes;
      patchState({
        profile: updatedProfile,
      });

      this.profileAPI.updateProfile(updatedProfile);
    }
  }

  @Action(SortSavedByDifficulty)
  sortSavedByDifficulty({
    patchState,
    getState,
  }: StateContext<ProfileStateModel>) {
    const updatedProfile = getState().profile;

    if (updatedProfile) {
      updatedProfile.savedRecipes.sort(function (a, b) {
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
        profile: updatedProfile,
      });
    }
  }

  @Action(SortSavedByNameAsc)
  sortSavedByNameAsc({
    patchState,
    getState,
  }: StateContext<ProfileStateModel>) {
    const updatedProfile = getState().profile;

    if (updatedProfile) {
      updatedProfile.savedRecipes.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      patchState({
        profile: updatedProfile,
      });
    }
  }

  @Action(SortSavedByNameDesc)
  sortSavedByNameDesc({
    patchState,
    getState,
  }: StateContext<ProfileStateModel>) {
    const updatedProfile = getState().profile;

    if (updatedProfile) {
      updatedProfile.savedRecipes.sort(function (a, b) {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      });
      patchState({
        profile: updatedProfile,
      });
    }
  }

  @Action(SortCreatedByDifficulty)
  sortCreatedByDifficulty({
    patchState,
    getState,
  }: StateContext<ProfileStateModel>) {
    const updatedProfile = getState().profile;

    if (updatedProfile) {
      updatedProfile.createdRecipes.sort(function (a, b) {
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
        profile: updatedProfile,
      });
    }
  }

  @Action(SortCreatedByNameAsc)
  sortCreatedByNameAsc({
    patchState,
    getState,
  }: StateContext<ProfileStateModel>) {
    const updatedProfile = getState().profile;

    if (updatedProfile) {
      updatedProfile.createdRecipes.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      patchState({
        profile: updatedProfile,
      });
    }
  }

  @Action(SortSavedByNameDesc)
  sortCreatedByNameDesc({
    patchState,
    getState,
  }: StateContext<ProfileStateModel>) {
    const updatedProfile = getState().profile;

    if (updatedProfile) {
      updatedProfile.createdRecipes.sort(function (a, b) {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      });
      patchState({
        profile: updatedProfile,
      });
    }
  }

  @Action(UpdateMealPlan)
  updateMealPlan(
    { patchState, getState }: StateContext<ProfileStateModel>,
    { mealPlan }: UpdateMealPlan
  ) {
    const updatedProfile = getState().profile;

    if (updatedProfile && mealPlan) {
      updatedProfile.currMealPlan = mealPlan;

      patchState({
        profile: updatedProfile,
      });

      const values = [0, 0, 0, 0];
      if (mealPlan) {
        if (mealPlan.breakfast) {
          values[0] = Math.floor(Math.random() * 100) + 350;
        }

        if (mealPlan.lunch) {
          values[1] = Math.floor(Math.random() * 200) + 450;
        }

        if (mealPlan.dinner) {
          values[2] = Math.floor(Math.random() * 300) + 450;
        }

        if (mealPlan.snack) {
          values[3] = Math.floor(Math.random() * 150) + 100;
        }
      }

      this.store.dispatch(new UpdateMealPlanData(values));

      this.profileAPI.updateProfile(updatedProfile);
      this.mealPlanAPI.saveMealPlan(mealPlan);
      this.store.dispatch(new RetrieveMealPlanIngredients(mealPlan));
    }
  }

  @Action(RemoveFromMealPlan)
  removeFromMealPlan(
    { getState }: StateContext<ProfileStateModel>,
    { meal }: RemoveFromMealPlan
  ) {
    const profile = getState().profile;
    if (!profile) {
      new ShowError('You Must Be Logged In To Update Meal Plan');
      return;
    }
    const mealPlan = profile?.currMealPlan;
    if (mealPlan) {
      if (mealPlan.breakfast && meal == 'breakfast') {
        mealPlan.breakfast = null;
      }
      if (mealPlan.lunch && meal == 'lunch') {
        mealPlan.lunch = null;
      }
      if (mealPlan.dinner && meal == 'dinner') {
        mealPlan.dinner = null;
      }
      if (mealPlan.snack && meal == 'snack') {
        mealPlan.snack = null;
      }
      this.store.dispatch(new UpdateMealPlan(mealPlan));
      this.store.dispatch(new RetrieveMealPlanIngredients(mealPlan));

      this.store.dispatch(new ShowInfo('Recipe Removed From Meal Plan'));
    }
  }

  @Action(AddToMealPlan)
  async addToMealPlan(
    { getState }: StateContext<ProfileStateModel>,
    { recipe, mealType, date }: AddToMealPlan
  ) {
    const profile = getState().profile;
    if (!profile) {
      this.store.dispatch(
        new ShowError('You Must Be Logged In To Add To Meal Plan')
      );
      return;
    }

    (await this.mealPlanAPI.getMealPlan(date, profile.username)).subscribe({
      next: (data) => {
        let mealPlan = data;
        if (mealPlan) {
          if (mealType === 'breakfast') {
            mealPlan.breakfast = recipe;
          }
          if (mealType === 'lunch') {
            mealPlan.lunch = recipe;
          }
          if (mealType === 'dinner') {
            mealPlan.dinner = recipe;
          }
          if (mealType === 'snack') {
            mealPlan.snack = recipe;
          }
        } else {
          mealPlan = {
            username: profile.username,
            date: date,
            breakfast: mealType === 'breakfast' ? recipe : null,
            lunch: mealType === 'lunch' ? recipe : null,
            dinner: mealType === 'dinner' ? recipe : null,
            snack: mealType === 'snack' ? recipe : null,
          };
        }
        this.store.dispatch(new UpdateMealPlan(mealPlan));
        this.store.dispatch(new ShowSuccess('Successfully Added To Meal Plan'));
      },
      error: (error) => {
        this.store.dispatch(new ShowError("Couldn't Retrive Meal Plan"));
      },
    });
  }

  @Action(RetrieveMealPlan)
  async retrieveMealPlan(
    { getState, patchState }: StateContext<ProfileStateModel>,
    { date }: RetrieveMealPlan
  ) {
    const newProfile = getState().profile;
    if (!newProfile) {
      this.store.dispatch(new ShowError('No profile: Not signed in.'));
      return;
    }

    (await this.mealPlanAPI.getMealPlan(date, newProfile.username)).subscribe({
      next: (data) => {
        newProfile.currMealPlan = data;

        patchState({
          profile: newProfile,
        });

        const values = [0, 0, 0, 0];
        if (data) {
          if (data.breakfast) {
            values[0] = Math.floor(Math.random() * 100) + 350;
          }

          if (data.lunch) {
            values[1] = Math.floor(Math.random() * 200) + 450;
          }

          if (data.dinner) {
            values[2] = Math.floor(Math.random() * 300) + 450;
          }

          if (data.snack) {
            values[3] = Math.floor(Math.random() * 150) + 100;
          }
        }

        this.store.dispatch(new UpdateMealPlanData(values));
        this.store.dispatch(new RetrieveMealPlanIngredients(data));
      },
      error: (error) => {
        this.store.dispatch(new ShowError("Couldn't Retrive Meal Plan"));
      },
    });
  }

  @Action(OpenSettings)
  openSettings({ patchState }: StateContext<SettingsStateModel>) {
    patchState({
      settings: 'block',
    });
  }

  @Action(CloseSettings)
  closeSettings({ patchState }: StateContext<SettingsStateModel>) {
    patchState({
      settings: 'none',
    });
  }
}
