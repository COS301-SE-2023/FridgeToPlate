import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomSkeletonLoaderComponent } from './custom-skeleton-loader.component';

describe('CustomSkeletonLoaderComponent', () => {
  let component: CustomSkeletonLoaderComponent;
  let fixture: ComponentFixture<CustomSkeletonLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomSkeletonLoaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomSkeletonLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
