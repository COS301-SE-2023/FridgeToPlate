import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class ProfileService {
    settingsSubject : BehaviorSubject<boolean> = new BehaviorSubject(false);
    constructor() {
        // constructor
    }
}