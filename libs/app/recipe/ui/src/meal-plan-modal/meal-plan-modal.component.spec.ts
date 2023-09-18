import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MealPlanModalComponent } from './meal-plan-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

describe('EditModalComponent', () => {
  let component: MealPlanModalComponent;
  let fixture: ComponentFixture<MealPlanModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule,
        FormsModule,
        HttpClientModule,
        RouterTestingModule,
      ],
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
    component.mealtypeSelected = "Breakfast"
    component.save();
    expect(component.saveFunc.emit).toBeCalled();
    expect(component.saveFunc.emit).toBeCalledWith({
      meal: 'Breakfast',
      date: new Date().toISOString().slice(0, 10),
    });
    expect(component.saveFunc.emit).toBeCalledWith({
      meal: 'Breakfast',
      date: new Date().toISOString().slice(0, 10),
    });
    expect(component.closeFunc.emit).toBeCalled();
  });

  it('save should call close func', () => {
    jest.spyOn(component.closeFunc, 'emit');
    component.close();
    expect(component.closeFunc.emit).toBeCalled();
  });
});
