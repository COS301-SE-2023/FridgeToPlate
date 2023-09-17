import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MealPlanModalComponent } from './meal-plan-modal.component';

describe('EditModalComponent', () => {
  let component: MealPlanModalComponent;
  let fixture: ComponentFixture<MealPlanModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MealPlanModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MealPlanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('save should call save and close func', () => {
    jest.spyOn(component.saveFunc, 'emit');
    jest.spyOn(component.closeFunc, 'emit');
    component.save("Breakfast")
    expect(component.saveFunc.emit).toBeCalled();
    expect(component.saveFunc.emit).toBeCalledWith({meal: "Breakfast", date: new Date().toISOString().slice(0, 10)});
    expect(component.closeFunc.emit).toBeCalled();
  }); 

  it('save should call close func', () => {
    jest.spyOn(component.closeFunc, 'emit');
    component.close()
    expect(component.closeFunc.emit).toBeCalled();
  }); 
});
