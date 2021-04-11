import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input, OnChanges,
  OnInit,
  Output,
  Renderer2, SimpleChanges,
  ViewChild
} from '@angular/core';
import {Vector} from '../../../core/types/vector';
import {SaveProfileDataService} from './save-profile-data.service';
import {ConstantsService} from '../../../core/services/constants.service';
import {SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.css']
})
export class ImagePickerComponent implements OnInit, AfterViewInit, OnChanges {

  imageUrl: string;
  private _selectedFile;
  private reader = new FileReader();
  private newImageBase64: string;
  private newImageBase64Small: string;
  imagePortraitMode = true;
  imagePosition: Vector = new Vector(0, 0);
  @ViewChild('fileInput') fileInput;
  @ViewChild('canvas') canvas;
  @ViewChild('canvasSmall') canvasSmall;
  @ViewChild('inputImage') inputImage;
  @ViewChild('fileInputWrapper') fileInputWrapper;
  @ViewChild('circleViewCanvas') circleViewCanvas;

  @Input() saveImageUrl: SafeResourceUrl;
  @Output() activateSettingsEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  saveImageUrlCopy: SafeResourceUrl;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private saveProfileDataService: SaveProfileDataService,
    private constants: ConstantsService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.drawBullseye();
  }

  activateSettings(): void {
    this.activateSettingsEvent.emit(false);
  }

  selectFile(event): void {

    this.reader.onload = (file: any) => {
      this.imageUrl = file.target.result;
      this._selectedFile = event.target.files.item(0);
    };
    this.reader.onerror = (file: any) => {
      console.log('File could not be read: ' + file.target.error.code);
    };
    this.reader.readAsDataURL(event.target.files[0]);

  }

  removeImage(): void {
    this.imageUrl = null;
    this.saveImageUrlCopy = null;
    this.fileInput.nativeElement.value = '';
  }

  public resizeAndDrawImage(): void {
    if (this.imageUrl != null) {
      this.imagePosition = new Vector(0, 0);
      this.setImageView();
      this.drawImage(this.imagePosition);
    }
  }


  drawImage(position: Vector): void {

    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    const context = canvasEl?.getContext('2d');
    const image = new Image();

    const squareLength = 200;
    canvasEl.width = squareLength;
    canvasEl.height = squareLength;

    image.onload = () => {
      const originalImageWidth = image.naturalWidth;
      const originalImageHeight = image.naturalHeight;

      const imageWidth = this.inputImage.nativeElement.offsetWidth;
      const imageHeight = this.inputImage.nativeElement.offsetHeight;

      let scale: number;
      if (originalImageWidth <= originalImageHeight) {
        scale = imageHeight / originalImageHeight;
      } else {
        scale = imageWidth / originalImageWidth;
      }
      const coordsOfOriginalImage = this.getCoordsOfOriginalImage();


      context.beginPath();
      context.arc(squareLength / 2, squareLength / 2, squareLength / 2, 0, Math.PI * 2, true);
      context.clip();


      context.drawImage(image, -position.x / scale, -position.y / scale, coordsOfOriginalImage.x, coordsOfOriginalImage.y, 0, 0, squareLength, squareLength);


      const canvasEl2: HTMLCanvasElement = this.canvasSmall.nativeElement;
      const context2 = canvasEl2?.getContext('2d');

      canvasEl2.width = 50;
      canvasEl2.height = 50;

      context2.beginPath();
      context2.arc(25, 25, 25, 0, Math.PI * 2, true);
      context2.clip();


      context2.drawImage(image, -position.x / scale, -position.y / scale, coordsOfOriginalImage.x, coordsOfOriginalImage.y, 0, 0, 50, 50);


      this.newImageBase64 = context.canvas.toDataURL('image/png', 0.5);
      this.newImageBase64Small = context2.canvas.toDataURL('image/png', 0.5);


    };

    image.src = this.imageUrl;
  }


  private getCoordsOfOriginalImage(): Vector {

    const containerWidth = this.fileInputWrapper.nativeElement.offsetWidth;
    const containerHeight = this.fileInputWrapper.nativeElement.offsetHeight;

    const imageWidth = this.inputImage.nativeElement.offsetWidth;
    const imageHeight = this.inputImage.nativeElement.offsetHeight;

    const originalImageWidth = this.inputImage.nativeElement.naturalWidth;
    const originalImageHeight = this.inputImage.nativeElement.naturalHeight;

    if ((imageWidth - containerWidth) > (imageHeight - containerHeight)) {
      return new Vector(originalImageHeight, originalImageHeight);
    } else {
      return new Vector(originalImageWidth, originalImageWidth);
    }
  }

  private setImageView(): void {
    const imageViewedHeight = this.inputImage.nativeElement.offsetHeight;
    const imageViewedWidth = this.inputImage.nativeElement.offsetWidth;
    this.imagePortraitMode = true;
    if (imageViewedHeight > imageViewedWidth) {
      this.imagePortraitMode = false;
    }
  }

  public handleNewPositionEvent(position: Vector): void {
    console.log(position);
    this.imagePosition = position;
    this.drawImage(position);
  }


  drawBullseye(): void {

    const canvasEl: HTMLCanvasElement = this.circleViewCanvas.nativeElement;

    const context = canvasEl?.getContext('2d');
    const squareLength = 200;
    canvasEl.width = squareLength;
    canvasEl.height = squareLength;

    context.fillStyle = '#FFFFFF';
    context.beginPath();

    context.arc(squareLength / 2, squareLength / 2, squareLength / 2, 0, Math.PI * 2, true);

    context.lineTo(squareLength, squareLength);
    context.lineTo(0, squareLength);
    context.lineTo(0, 0);
    context.lineTo(squareLength, 0);
    context.lineTo(squareLength, squareLength / 2);
    context.closePath();
    context.fill();

  }

  public uploadProfile(): void {

    const userDTO = this.constants.getUser;

    userDTO.pictureUrl = 'resources/' + userDTO.id + '/profilePics/' + 'profileImage.png';
    userDTO.pictureUrlSmall = 'resources/' + userDTO.id + '/profilePics/' + 'profileImageSmall.png';

    userDTO.profileImage = this.newImageBase64;
    userDTO.profileImageSmall = this.newImageBase64Small;

    this.saveProfileDataService.uploadProfile(userDTO).subscribe(answer => {
        this.activateSettings();
        window.location.reload();
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.saveImageUrlCopy === undefined) {
      this.saveImageUrlCopy = this.saveImageUrl;
    }
  }
}
