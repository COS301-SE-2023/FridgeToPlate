import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[appClickedOutside]',
})
export class ClickedOutsideDirective {
  
  constructor(private el: ElementRef) {}

  @Output() clickedOutsideFunc = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onClick(target: any) {
    console.log("Clicked Event");
    const clickedInside = this.el.nativeElement.contains(target);
    if (!clickedInside) {
      this.clickedOutsideFunc.emit();
    }
  }
}
