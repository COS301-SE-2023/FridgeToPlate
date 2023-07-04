import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsModalComponent } from './settings-modal.component';

describe('EditModalComponent', () => {
  let component: SettingsModalComponent;
  let fixture: ComponentFixture<SettingsModalComponent>;
  let testProfile = {
    name: "John Doe",
    username: "jdoe",
    email: "jdoe@gmail.com",
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsModalComponent);
    component = fixture.componentInstance;
    component.editableProfile = testProfile;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
