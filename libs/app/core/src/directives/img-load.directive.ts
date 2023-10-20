import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[appActualImage]'
})
export class ActualImageDirective implements OnInit {
  @Input('appActualImage') imageUrl: string;

  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.waitForImage(this.imageUrl);
  }

  private waitForImage(url: string) {
    const tempImg = new Image();
    tempImg.onload = () => {
      this.element.nativeElement.setAttribute('src', url);
    };
    tempImg.src = url;
  }
}
