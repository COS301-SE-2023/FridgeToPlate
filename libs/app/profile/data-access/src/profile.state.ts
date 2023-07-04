import { Injectable } from "@angular/core";
import { IProfile, UpdateProfile } from "@fridge-to-plate/app/profile/utils";
import { Action, Selector, State, StateContext } from "@ngxs/store";

export interface ProfileStateModel {
    profile: IProfile | null;
}

@State<ProfileStateModel>({
    name: 'profile',
    defaults: {
        profile: null
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