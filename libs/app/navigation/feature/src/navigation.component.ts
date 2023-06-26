import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationBar {
  constructor(private router: Router) {}

  isActive(pageName: string) {
    return this.router.url.includes(pageName) ? 'active' : '';
  }
}
