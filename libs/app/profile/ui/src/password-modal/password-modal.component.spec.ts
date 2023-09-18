import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngxs/store';
import { PasswordModalComponent } from './password-modal.component';
import { ChangePassword } from '@fridge-to-plate/app/auth/utils';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import {FormsModule} from "@angular/forms";
import { ShowInfo } from '@fridge-to-plate/app/info/utils';

describe('PasswordModalComponent', () => {
  let component: PasswordModalComponent;
  let fixture: ComponentFixture<PasswordModalComponent>;
  let mockStore: Partial<Store>;

  beforeEach(() => {
    mockStore = {
      dispatch: jest.fn()
    };

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [PasswordModalComponent],
      providers: [{ provide: Store, useValue: mockStore }]
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the modal when close() is called', () => {
    const closeFuncEmitterSpy = jest.spyOn(component.closeFunc, 'emit');
    component.close();
    expect(closeFuncEmitterSpy).toHaveBeenCalled();
  });

  it('should dispatch ChangePassword action and emit saveFunc and closeFunc when save() is called with matching passwords', () => {
    component.oldPassword = 'oldPassword';
    component.newPassword = 'newPassword';
    component.confirmPassword = 'newPassword'; // Matching with newPassword

    const saveFuncEmitterSpy = jest.spyOn(component.saveFunc, 'emit');
    const closeFuncEmitterSpy = jest.spyOn(component.closeFunc, 'emit');

    component.save();

    expect(mockStore.dispatch).toHaveBeenCalledWith(new ChangePassword('oldPassword', 'newPassword'));
    expect(saveFuncEmitterSpy).toHaveBeenCalled();
    expect(closeFuncEmitterSpy).toHaveBeenCalled();
  });

  it('should dispatch ShowInfo action when save() is called with non-matching passwords', () => {
    component.oldPassword = 'oldPassword';
    component.newPassword = 'newPassword';
    component.confirmPassword = 'differentPassword'; // Non-matching with newPassword

    const saveFuncEmitterSpy = jest.spyOn(component.saveFunc, 'emit');
    const closeFuncEmitterSpy = jest.spyOn(component.closeFunc, 'emit');

    component.save();

    expect(mockStore.dispatch).toHaveBeenCalledWith(new ShowInfo("Passwords Entered Do Not Match"));
    expect(saveFuncEmitterSpy).not.toHaveBeenCalled();
    expect(closeFuncEmitterSpy).not.toHaveBeenCalled();
  });

  it('should call close() when the close button is clicked', () => {
    const closeFuncEmitterSpy = jest.spyOn(component.closeFunc, 'emit');
    const closeButton = fixture.nativeElement.querySelector('#close-button');
    closeButton.click();
    expect(closeFuncEmitterSpy).toHaveBeenCalled();
  });

  it('should call save() when the save button is clicked with matching passwords', () => {
    component.oldPassword = 'oldPassword';
    component.newPassword = 'newPassword';
    component.confirmPassword = 'newPassword'; // Matching with newPassword

    const saveFuncEmitterSpy = jest.spyOn(component.saveFunc, 'emit');
    const saveButton = fixture.nativeElement.querySelector('#save-button');
    saveButton.click();
    expect(mockStore.dispatch).toHaveBeenCalledWith(new ChangePassword('oldPassword', 'newPassword'));
    expect(saveFuncEmitterSpy).toHaveBeenCalled();
  });

  it('should call save() when the save button is clicked with non-matching passwords', () => {
    component.oldPassword = 'oldPassword';
    component.newPassword = 'newPassword';
    component.confirmPassword = 'differentPassword'; // Non-matching with newPassword

    const saveFuncEmitterSpy = jest.spyOn(component.saveFunc, 'emit');
    const saveButton = fixture.nativeElement.querySelector('#save-button');
    saveButton.click();
    expect(mockStore.dispatch).toHaveBeenCalledWith(new ShowInfo("Passwords Entered Do Not Match"));
    expect(saveFuncEmitterSpy).not.toHaveBeenCalled();
  });
});
