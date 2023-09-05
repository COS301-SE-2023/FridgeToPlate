import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import Quagga from '@ericblade/quagga2';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { AddIngredient } from '@fridge-to-plate/app/recommend/utils';
import { Store } from '@ngxs/store';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'barcode-modal',
  templateUrl: './barcode-modal.component.html',
  styleUrls: ['./barcode-modal.component.scss'],
})
export class BarcodeModalComponent implements AfterViewInit {
  @Output() closeFunc: EventEmitter<any> = new EventEmitter();

  environmentFacingCameraLabelStrings: string[] = [
    'rear',
    'back',
    'rück',
    'arrière',
    'trasera',
    'trás',
    'traseira',
    'posteriore',
    '后面',
    '後面',
    '背面',
    '后置', // alternative
    '後置', // alternative
    '背置', // alternative
    'задней',
    'الخلفية',
    '후',
    'arka',
    'achterzijde',
    'หลัง',
    'baksidan',
    'bagside',
    'sau',
    'bak',
    'tylny',
    'takakamera',
    'belakang',
    'אחורית',
    'πίσω',
    'spate',
    'hátsó',
    'zadní',
    'darrere',
    'zadná',
    'задня',
    'stražnja',
    'belakang',
    'बैक'
  ];

  started: boolean | undefined;
  errorMessage: string | undefined;
  acceptAnyCode = true;
  ingredient : IIngredient | null = {
    name: "Carrot",
    amount: 2,
    unit: "g"
  };

  constructor(private changeDetectorRef: ChangeDetectorRef, private store: Store ) {}

  ngAfterViewInit(): void {
    if (!navigator.mediaDevices || !(typeof navigator.mediaDevices.getUserMedia === 'function')) {
      this.errorMessage = 'getUserMedia is not supported';
      return;
    }

    this.initializeScanner();
  }

  private initializeScanner(): Promise<void> {
    if (!navigator.mediaDevices || !(typeof navigator.mediaDevices.getUserMedia === 'function')) {
      this.errorMessage = 'getUserMedia is not supported. Please use Chrome on Android or Safari on iOS';
      this.started = false;
      return Promise.reject(this.errorMessage);
    }

    // enumerate devices and do some heuristics to find a suitable first camera
    return Quagga.CameraAccess.enumerateVideoDevices()
      .then(mediaDeviceInfos => {
        const mainCamera = this.getMainBarcodeScanningCamera(mediaDeviceInfos);
        if (mainCamera) {
          return this.initializeScannerWithDevice(mainCamera.deviceId);
        } else {
          return this.initializeScannerWithDevice(undefined);
        }
      })
      .catch(error => {
        this.started = false;
      });
  }

  private initializeScannerWithDevice(preferredDeviceId: string | undefined): Promise<void> {
    console.log(`Initializing Quagga scanner...`);

    const constraints: MediaTrackConstraints = {};
    if (preferredDeviceId) {
      // if we have a specific device, we select that
      constraints.deviceId = preferredDeviceId;
    } else {
      // otherwise we tell the browser we want a camera facing backwards (note that browser does not always care about this)
      constraints.facingMode = 'environment';
    }

    return Quagga.init({
        inputStream: {
          type: 'LiveStream',
          constraints,
          area: { // defines rectangle of the detection/localization area
            top: '25%',    // top offset
            right: '10%',  // right offset
            left: '10%',   // left offset
            bottom: '25%'  // bottom offset
          },
          target: document.querySelector('#scanner-container') ?? undefined
        },
        decoder: {
          readers: ['ean_reader'],
          multiple: false
        },
        // See: https://github.com/ericblade/quagga2/blob/master/README.md#locate
        locate: false
      },
      (err) => {
        if (err) {
          this.started = false;
        } else {
          Quagga.start();
          this.started = true;
          this.changeDetectorRef.detectChanges();
          Quagga.onDetected((res) => {
            if (res.codeResult.code) {
              this.onBarcodeScanned(res.codeResult.code);
            }
          });
        }
      });
  }

  onBarcodeScanned(code: string) {
    alert(code);
  }
  
  isKnownBackCameraLabel(label: string): boolean {
    const labelLowerCase = label.toLowerCase();
    return this.environmentFacingCameraLabelStrings.some(str => {
      return labelLowerCase.includes(str);
    });
  }
  
  getMainBarcodeScanningCamera(devices: MediaDeviceInfo[]): MediaDeviceInfo | undefined {
    const backCameras = devices.filter(v => this.isKnownBackCameraLabel(v.label));
    const sortedBackCameras = backCameras.sort((a, b) => a.label.localeCompare(b.label));
    return sortedBackCameras.length > 0 ? sortedBackCameras[0] : undefined;
  }

  addIngredient() {
    this.store.dispatch(new AddIngredient(this.ingredient as IIngredient));
    this.ingredient = null;
  }

  close() {
    this.closeFunc.emit();
  }
}
