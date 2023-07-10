import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabbedComponent } from './tabbed.component';

describe('TabbedComponent', () => {
  let component: TabbedComponent;
  let fixture: ComponentFixture<TabbedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabbedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
