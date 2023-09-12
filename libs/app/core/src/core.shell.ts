/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/component-class-suffix */
import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { environment } from '@fridge-to-plate/app/environments/utils';
@Component({
  selector: 'core-shell',
  templateUrl: './core.shell.html',
  styleUrls: ['./core.shell.scss'],
})
export class CoreShell {
  title = 'FridgeToPlate';


  subscribeToNotifications() {
    this.swPush
      .requestSubscription({
        serverPublicKey: environment.VAPIDPublicKey,
      })
      .then((sub: PushSubscription) => {
        console.log(sub);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  constructor(private swPush: SwPush) {
    this.subscribeToNotifications();
  }
}
