import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarcodeModalComponent } from './barcode-modal.component';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';

describe('BarcodeModalComponent', () => {
  let component: BarcodeModalComponent;
  let fixture: ComponentFixture<BarcodeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [NgxsModule.forRoot(), HttpClientModule],
        declarations: [BarcodeModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BarcodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});