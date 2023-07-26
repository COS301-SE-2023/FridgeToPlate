import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnauthorisedPage } from './unauthorised.page';
import { NgxsModule, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

describe("UnauthorisedPage", () => {
  let component: UnauthorisedPage;
  let fixture: ComponentFixture<UnauthorisedPage>;
  let mockStore: Store;
  let dispatchSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot()],
      declarations: [UnauthorisedPage],
      providers: [
        
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UnauthorisedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockStore = TestBed.inject(Store);
    dispatchSpy = jest.spyOn(mockStore, 'dispatch');
  });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should navigate to login', () => {
      component.login();

      expect(dispatchSpy).toBeCalledWith(new Navigate(['/login']));
    });

    it('should navigate to signup', () => {
      component.signUp();

      expect(dispatchSpy).toBeCalledWith(new Navigate(['/signup']));
    });
});

