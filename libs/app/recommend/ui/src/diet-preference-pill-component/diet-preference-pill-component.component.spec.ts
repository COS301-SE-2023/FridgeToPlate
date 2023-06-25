import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DietPreferencePillComponentComponent } from './diet-preference-pill-component.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NzI18nService } from 'ng-zorro-antd/i18n';

describe('DietPreferencePillComponentComponent', () => {
  let component: DietPreferencePillComponentComponent;
  let fixture: ComponentFixture<DietPreferencePillComponentComponent>;

  let intlService = NzI18nService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DietPreferencePillComponentComponent],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
      providers: [intlService],
    }).compileComponents();

    fixture = TestBed.createComponent(DietPreferencePillComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
