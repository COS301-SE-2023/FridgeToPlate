import { Injectable } from '@angular/core';
import { environment } from '@fridge-to-plate/app/environments/utils';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket(
      `${
        environment.TYPE === 'dev'
          ? environment.API_WS_URL_DEV
          : environment.API_WS_URL_PROD
      }`
    );
  }

  getSocket() {
    return this.socket$;
  }
}
