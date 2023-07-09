import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';


export interface INotification { 
    userName: string;
    profilePictureUrl: string;
    comment: string;
}

@Injectable({
    providedIn: 'root',
  })
  
export class NotificationsApi{

    data: INotification[] = [
        {
            userName: "Ryan T.",
            profilePictureUrl: "https: //picsum.photos/400",
            comment: "Random comment."
        },
        {
            userName: "Paul P.",
            profilePictureUrl: "https: //picsum.photos/400",
            comment: "Random comment."
        },
        {
            userName: "Azola L.",
            profilePictureUrl: "https: //picsum.photos/400",
            comment: "Random comment."
        },
        {
            userName: "Simphiwe N.",
            profilePictureUrl: "https: //picsum.photos/400",
            comment: "Random comment."
        }
    ];

    getAllNotifications(userId: string){
        return new BehaviorSubject(this.data);
    }

}