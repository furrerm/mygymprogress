import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SaveSimplePostService} from './save-simple-post.service';
import {SimplePostDTO} from '../../../core/model/swagger-model/simplePostDTO';
import {Vector} from '../../../core/types/vector';
import {CdkDragEnd} from '@angular/cdk/drag-drop';
import {ConstantsService} from '../../../core/services/constants.service';
import {Router} from '@angular/router';
import {max} from 'rxjs/operators';

@Component({
  selector: 'app-simple-post',
  templateUrl: './simple-post.component.html',
  styleUrls: ['./simple-post.component.css', '../new-workout/new-workout.component.css', '../../../shared/shared.style.css']
})
export class SimplePostComponent implements OnInit, AfterViewInit {

  url: string;
  private _selectedFile;
  private reader = new FileReader();
  private simplePostDTO: SimplePostDTO = null;
  private _description: string;
  dragPosition: Vector = new Vector(0, 0);
  private cx?: CanvasRenderingContext2D;
  private newImageBase64: string;
  @ViewChild('canvas') canvas;
  @ViewChild('fileInputWrapper') fileInputWrapper;
  @ViewChild('inputImage') inputImage;
  @ViewChild('fileInput') fileInput;

  constructor(
    private simplePostService: SaveSimplePostService,
    private constants: ConstantsService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.setFileInputWrapperHeight();
  }

  private setFileInputWrapperHeight(): void {
    const fileInputWrapperWidth = this.fileInputWrapper.nativeElement.offsetWidth;
    this.fileInputWrapper.nativeElement.style.height = (fileInputWrapperWidth / 4 * 3);
  }

  selectFile(event): void {


    this.reader.onload = (file: any) => {
      this.url = file.target.result;
      this._selectedFile = event.target.files.item(0);
    };
    this.reader.onerror = (file: any) => {
      console.log('File could not be read: ' + file.target.error.code);
    };
    this.reader.readAsDataURL(event.target.files[0]);

  }

  removeImage(): void {
    this.url = null;
    this.dragPosition = new Vector(0, 0);
    this.fileInput.nativeElement.value = '';
  }

  upload(): void {
    const timeNow = Date.now();
    this.simplePostDTO = {
      postId: null,
      description: this.description,
      previewImage: this.newImageBase64,
      previewImageUrl: 'resources/' + this.constants.getUser.id + '/simple-posts/' + timeNow,
      userDTO: this.constants.getUser
    };
    this.simplePostService.uploadSimpleWorkout(this.simplePostDTO).subscribe(a => {
      this.router.navigate(['/management/1']);
    });

  }

  public canvasDrawing(): void {

    const maxWidth = 1080;
    const heightToMaxWidth = 1080 * 3 / 4;

    const realWidth = this.inputImage.nativeElement.naturalWidth;
    const realHeight = this.inputImage.nativeElement.naturalHeight;

    if (realWidth > maxWidth && realHeight > heightToMaxWidth) {
      this.scaleForOversize();
    } else {
      this.scaleForUndersized();
    }
  }

  scaleForOversize(): void {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl?.getContext('2d');
    const image = new Image();

    const canvasWidth = 1080;
    const canvasHeight = 1080 * 3 / 4;

    const realWidth = this.inputImage.nativeElement.naturalWidth;
    const realHeight = this.inputImage.nativeElement.naturalHeight;

    let scale = canvasWidth / realWidth;

    if (realHeight * scale < canvasHeight) {
      scale = (canvasHeight) / realHeight;
    }
    const presentedWidth = this.inputImage.nativeElement.offsetWidth;

    const imageWidthInCanvas = realWidth * scale;

    const scale2 = presentedWidth / realWidth;

    canvasEl.width = canvasWidth;
    canvasEl.height = canvasHeight;

    image.onload = () => {
      this.cx.drawImage(image, -this.dragPosition.x / scale2, -this.dragPosition.y / scale2, canvasWidth / scale, canvasHeight / scale, 0, 0, canvasWidth, canvasHeight);

      this.newImageBase64 = this.cx.canvas.toDataURL('image/jpeg', 0.5);

    };
    image.src = this.url;
  }

  scaleForUndersized(): void {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl?.getContext('2d');
    const image = new Image();

    const wrapperWidth = this.fileInputWrapper.nativeElement.offsetWidth;
    const wrapperHeight = this.fileInputWrapper.nativeElement.offsetHeight;

    const presentedWidth = this.inputImage.nativeElement.offsetWidth;
    const presentedHeight = this.inputImage.nativeElement.offsetHeight;

    const realWidth = this.inputImage.nativeElement.naturalWidth;
    const realHeight = this.inputImage.nativeElement.naturalHeight;

    const xScale = realWidth / presentedWidth;
    const yScale = realHeight / presentedHeight;

    const xPart = xScale * wrapperWidth;
    const yPart = yScale * wrapperHeight;

    canvasEl.width = xPart;
    canvasEl.height = yPart;

    image.onload = () => {
      this.cx.drawImage(image, -this.dragPosition.x * xScale, -this.dragPosition.y * yScale, xPart, yPart, 0, 0, xPart, yPart);
      this.newImageBase64 = this.cx.canvas.toDataURL('image/jpeg', 0.5);
    };
    image.src = this.url;
  }

  dragTheImage(event: CdkDragEnd): void {
    const width = this.inputImage.nativeElement.offsetWidth;
    const height = this.inputImage.nativeElement.offsetHeight;
    const wrapperWidth = this.fileInputWrapper.nativeElement.offsetWidth;
    const wrapperHeight = this.fileInputWrapper.nativeElement.offsetHeight;
    let marginTop = event.source.getFreeDragPosition().y;
    const marginLeft = event.source.getFreeDragPosition().x;
    this.dragPosition.x = marginLeft;
    this.dragPosition.y = marginTop;
    if (marginTop > 0) {
      this.dragPosition.x = marginLeft;
      this.dragPosition.y = 0;
    } else if (marginTop < 0 && Math.abs(marginTop) > height - wrapperHeight) {
      const res = height - wrapperHeight;
      this.dragPosition.x = marginLeft;
      this.dragPosition.y = -res;
    }
    marginTop = this.dragPosition.y;
    if (marginLeft > 0) {
      this.dragPosition.x = 0;
      this.dragPosition.y = marginTop;
    } else if (marginLeft < 0 && Math.abs(marginLeft) > width - wrapperWidth) {
      const res = width - wrapperWidth;
      this.dragPosition.x = -res;
      this.dragPosition.y = marginTop;
    }
    this.canvasDrawing();

  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }
}
