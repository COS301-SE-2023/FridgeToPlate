import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NotificationsPageComponent } from './notifications-page.component';
import { RouterTestingModule } from '@angular/router/testing';

import { TabbedComponent } from 'libs/app/core/src/tabbed-component/tabbed-component';
import { TabComponent } from 'libs/app/notifications/ui/src/lib/tab/tab.component';
import { AppNotificationsUiModule } from '@fridge-to-plate/app/notifications/ui';
import { Router, Routes } from '@angular/router';

describe('NotificationsPageComponent', () => {
  let component: NotificationsPageComponent;
  let fixture: ComponentFixture<NotificationsPageComponent>;
  let router: Router;

  const routes: Routes = [
    {
      path: 'recipe/:id',
      component: NotificationsPageComponent,
    },
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppNotificationsUiModule,
        RouterTestingModule.withRoutes(routes),
      ],
      declarations: [NotificationsPageComponent, TabbedComponent, TabComponent],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsPageComponent);
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
    component.notifications$.subscribe((next) => {
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
