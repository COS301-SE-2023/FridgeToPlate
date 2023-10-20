import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { environment } from '@fridge-to-plate/app/environments/utils';
import { from, map } from 'rxjs';
import { WebSocketService } from './services/web-socket.service';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'core-shell',
  templateUrl: './core.shell.html',
  styleUrls: ['./core.shell.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
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
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      map((pushSubsriptionResponse) => {})
    );
  }
}
