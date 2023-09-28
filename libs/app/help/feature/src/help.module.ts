import { NgModule } from '@angular/core';
import { HelpRouting } from './help.routing';
import { HelpPage } from './help.page';


@NgModule({
  imports: [
    HelpRouting,
  ],
  declarations: [HelpPage],
  exports: [HelpPage],
})
export class HelpModule {}
