import {NotificationsPage} from "./notifications.page";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import { Router, Routes} from "@angular/router";
import {NotificationsUiModule} from "@fridge-to-plate/app/notifications/ui";
import {RouterTestingModule} from "@angular/router/testing";
import {
  ClearGeneralNotifications,
  ClearRecommendationNotifications,
} from "@fridge-to-plate/app/notifications/data-access";
import {Location} from "@angular/common";
import {NgxsModule, State, Store} from "@ngxs/store";
import {Injectable} from "@angular/core";
import { Navigate } from "@ngxs/router-plugin";

describe('NotificationsPage tests', () => {

  @State({
    name: 'notifications',
    defaults: {
      generalNotifications: [],
      recommendationNotification: [],
    }
  })
  @Injectable()
  class MockNotificationsState {}


  let component: NotificationsPage;
  let fixture: ComponentFixture<NotificationsPage>;
  let location: Location;
  let store: Store;
  let page: any;
  const routes: Routes = [
    {
      path: 'recipe/:id',
      component: NotificationsPage,
    },
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsUiModule, RouterTestingModule.withRoutes(routes), NgxsModule.forRoot([MockNotificationsState])],
      declarations: [NotificationsPage],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    location = TestBed.inject(Location);
    page = fixture.componentInstance;
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate back when goBack() is called', () => {
    const locationSpy = jest.spyOn(location, 'back');
    component.goBack();
    expect(locationSpy).toHaveBeenCalled();
  });

  it('should dispatch ClearGeneralNotifications action on clearAllNotifications', () => {
    const storeSpy = jest.spyOn(store, 'dispatch');
    page.clearAllNotifications('general');
    
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(storeSpy).toHaveBeenCalledWith(ClearGeneralNotifications);
    });
  });

  it('should dispatch ClearRecommendationNotifications action on clearAllNotifications', () => {
    const storeSpy = jest.spyOn(store, 'dispatch');
    page.clearAllNotifications('recommendations');
    
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(storeSpy).toHaveBeenCalledWith(ClearRecommendationNotifications);
    });
  });

  it('should have general notifications in state', () => {
    component.generalNotifications$.subscribe( next => {
      expect(next).not.toBeFalsy();
    })
  });

  it('should have recommendation notifications in state', () => {
    component.recommendationNotifications$.subscribe( next => {
      expect(next).not.toBeFalsy();
    })
  });

  it('should clear general notifications in state', () => {
    page.clearAllNotifications('general')
    component.generalNotifications$.subscribe( next => {
      expect(next).toBeFalsy();
    })
  });

  it('should clear recommendation notifications in state', () => {
    page.clearAllNotifications('recommendation')
    component.recommendationNotifications$.subscribe( next => {
      expect(next).toBeFalsy();
    })
  });

  it('test on notification click navigates to recipe_page', () => {
    const storeSpy = jest.spyOn(store, 'dispatch');
    component.onNotificationClick('testRecipeId');
    expect(storeSpy).toHaveBeenCalledWith(new Navigate([`recipe/testRecipeId`]));
  });

});
