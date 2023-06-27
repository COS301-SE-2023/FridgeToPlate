import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditModalComponent } from './edit-modal.component';

describe('EditModalComponent', () => {
  let component: EditModalComponent;
  let fixture: ComponentFixture<EditModalComponent>;
  let testProfile = {
    name: "John Doe",
    username: "jdoe",
    email: "jdoe@gmail.com",
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditModalComponent);
    component = fixture.componentInstance;
    component.editableProfile = testProfile;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
