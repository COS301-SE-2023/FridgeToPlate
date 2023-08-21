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
} from '@fridge-to-plate/app/profile/utils';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { ProfileAPI } from './profile.api';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { ShowUndo } from '@fridge-to-plate/app/undo/utils';
import { MealPlanAPI } from '@fridge-to-plate/app/meal-plan/data-access';
import { environment } from '@fridge-to-plate/app/environments/utils';
import { IMealPlan } from '@fridge-to-plate/app/meal-plan/utils';

export interface ProfileStateModel {
  profile: IProfile | null;
}

@State<ProfileStateModel>({
  name: 'profile',
  defaults: {
    profile: environment.TYPE === 'production' ? null : null,
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
        if (data?.username) {
          setState({
            profile: data,
          });
        } else throw new Error('User does not exist');
      },
      error: (error) => {
        this.store.dispatch(new ShowError(error));
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
          this.store.dispatch(new ShowError('Recipe Already Stored'));
          return;
        }
      }

      updatedProfile?.savedRecipes.push(recipe);
      patchState({
        profile: updatedProfile,
      });

      this.profileAPI.updateProfile(updatedProfile);
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
      this.profileAPI.updateProfile(updatedProfile);
      this.mealPlanAPI.saveMealPlan(mealPlan);
    }
  }

  @Action(RemoveFromMealPlan)
  removeFromMealPlan(
    { getState }: StateContext<ProfileStateModel>,
    { recipeId }: RemoveFromMealPlan
  ) {
    const profile = getState().profile;
    if (!profile) {
      this.store.dispatch(new ShowError('No profile: Not signed in'));
      return;
    }
    const mealPlan = profile?.currMealPlan;
    if (mealPlan) {
      if (mealPlan.breakfast && mealPlan.breakfast.recipeId === recipeId) {
        mealPlan.breakfast = null;
      }
      if (mealPlan.lunch && mealPlan.lunch.recipeId === recipeId) {
        mealPlan.lunch = null;
      }
      if (mealPlan.dinner && mealPlan.dinner.recipeId === recipeId) {
        mealPlan.dinner = null;
      }
      if (mealPlan.snack && mealPlan.snack.recipeId === recipeId) {
        mealPlan.snack = null;
      }
      this.store.dispatch(new UpdateMealPlan(mealPlan));
    }
  }

  @Action(AddToMealPlan)
  addToMealPlan(
    { getState }: StateContext<ProfileStateModel>,
    { recipe, mealType }: AddToMealPlan
  ) {
    const profile = getState().profile;
    if (!profile) {
      this.store.dispatch(new ShowError('No profile: Not signed in.'));
      return;
    }
    const mealPlan = profile?.currMealPlan;
    if (mealPlan) {
      if (mealType === 'Breakfast') {
        mealPlan.breakfast = recipe;
      }
      if (mealType === 'Lunch') {
        mealPlan.lunch = recipe;
      }
      if (mealType === 'Dinner') {
        mealPlan.dinner = recipe;
      }
      if (mealType === 'Snack') {
        mealPlan.snack = recipe;
      }
      this.store.dispatch(new UpdateMealPlan(mealPlan));
    } else {
      const newMealPlan: IMealPlan = {
        username: profile.username,
        date: new Date().toISOString().slice(0, 10),
        breakfast: mealType === 'Breakfast' ? recipe : null,
        lunch: mealType === 'Lunch' ? recipe : null,
        dinner: mealType === 'Dinner' ? recipe : null,
        snack: mealType === 'Snack' ? recipe : null,
      };
      this.store.dispatch(new UpdateMealPlan(newMealPlan));
    }
  }
}
