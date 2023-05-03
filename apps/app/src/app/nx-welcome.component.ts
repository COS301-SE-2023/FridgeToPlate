import { Component, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "fridge-to-plate-nx-welcome",
  template: `<style>
  h1 {
    font-size: 36px;
    font-weight: bold;
    color: #ff69b4;
    text-align: center;
  }
  
  h2 {
    font-size: 24px;
    font-weight: normal;
    color: #333;
    text-align: center;
    margin-top: 20px;
  }
</style>

<div>
  <h1>Spice Girls</h1>
  <h2>FridgeToPlate</h2>
</div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent {}
