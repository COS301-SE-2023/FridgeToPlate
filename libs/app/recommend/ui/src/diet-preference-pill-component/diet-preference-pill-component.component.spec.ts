import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DietPreferencePillComponentComponent } from './diet-preference-pill-component.component';

describe('DietPreferencePillComponentComponent', () => {
  let component: DietPreferencePillComponentComponent;
  let fixture: ComponentFixture<DietPreferencePillComponentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DietPreferencePillComponentComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DietPreferencePillComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
