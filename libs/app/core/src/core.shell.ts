/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/component-class-suffix */
import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { environment } from '@fridge-to-plate/app/environments/utils';
import { from, map, of } from 'rxjs';
import { WebSocketService } from './services/web-socket.service';
@Component({
  selector: 'core-shell',
  templateUrl: './core.shell.html',
  styleUrls: ['./core.shell.scss'],
})
export class CoreShell {
  title = 'FridgeToPlate';

  subscribeToNotificationsPromise = this.swPush
    .requestSubscription({
      serverPublicKey: environment.VAPIDPublicKey,
    })
    .then((sub: PushSubscription) => {
      console.log(sub);
      //Send to backend
      return sub;
    })
    .catch((error) => {
      console.log(error);
    });

  constructor(
    private swPush: SwPush,
    private webSocketService: WebSocketService
  ) {
    from(this.subscribeToNotificationsPromise).pipe(
      map((pushSubsriptionResponse) => {})
    );
  }
}
