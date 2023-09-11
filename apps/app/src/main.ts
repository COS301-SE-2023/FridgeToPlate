import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { CoreModule } from '@fridge-to-plate/app/core';
import { environment } from "@fridge-to-plate/app/environments/utils";

if (environment.TYPE === 'development') {
  console.log(`TYPE: ${environment.TYPE}`);
  console.log(`API_URL: ${environment.API_URL}`);
  console.log(`COGNITO_USERPOOL_ID: ${environment.COGNITO_USERPOOL_ID}`);
  console.log(`COGNITO_APP_CLIENT_ID: ${environment.COGNITO_APP_CLIENT_ID}`);
}

if (environment.TYPE === 'production') {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(CoreModule)
  .catch((err) => console.error(err));
