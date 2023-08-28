import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppinglistComponent } from './shoppinglist.component';

describe('ShoppinglistComponent', () => {
  let component: ShoppinglistComponent;
  let fixture: ComponentFixture<ShoppinglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShoppinglistComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
