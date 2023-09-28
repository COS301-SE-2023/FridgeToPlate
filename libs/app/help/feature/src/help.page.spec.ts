import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpPage } from './help.page';

import { NgxsModule } from '@ngxs/store';

describe('helpPage', () => {
  let component: HelpPage;
  let fixture: ComponentFixture<HelpPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HelpPage],
      imports: [
        NgxsModule.forRoot(),
      ],
    });

    fixture = TestBed.createComponent(HelpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
