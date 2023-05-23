import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { CoreModule } from '@fridge-to-plate/app/core';
platformBrowserDynamic()
  .bootstrapModule(CoreModule)
  .catch((err) => console.error(err));
