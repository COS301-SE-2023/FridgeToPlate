import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NotificationsPage } from './notifications.page';

import { RouterTestingModule } from '@angular/router/testing';

import { TabComponent } from '../../ui/src/tab/tab.component';

import { TabbedComponent } from 'libs/app/core/src/tabbed-component/tabbed-component';

import { NotificationsUiModule as NotificationsUiModule } from '@fridge-to-plate/app/notifications/ui';
import { Router, Routes } from '@angular/router';
import { INotification } from '../../data-access/src/notifications-api';

describe('NotificationsPageComponent', () => {
  let component: NotificationsPage;
  let fixture: ComponentFixture<NotificationsPage>;
  let router: Router;

  const routes: Routes = [
    {
      path: 'recipe/:id',
      component: NotificationsPage,
    },
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsUiModule, RouterTestingModule.withRoutes(routes)],
      declarations: [NotificationsPage, TabbedComponent, TabComponent],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should instantiate with correct parameters', () => {
    expect(component.tabs.length).toBe(2);
    expect(component.tabs[0].category).toBe('General');
    expect(component.tabs[1].category).toBe('Recommendations');
  });

  it('should emit correct notifications', () => {
    component.notifications$.subscribe((next: INotification[]) => {
      expect(next).toBeTruthy();
      expect(next.length).toBeGreaterThan(0);
    });
  });

  it('should navigate to recipe on click', waitForAsync(() => {
    jest.spyOn(router, 'navigate');
    component.onNotificationClick('random-recipe-id');
    expect(router.navigate).toHaveBeenCalledWith(['recipe/random-recipe-id']);
  }));
});
