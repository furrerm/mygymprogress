import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SaveSimplePostService} from './save-simple-post.service';
import {SimplePostDTO} from '../../../core/model/swagger-model/simplePostDTO';
import {Vector} from '../../../core/types/vector';
import {CdkDragEnd} from '@angular/cdk/drag-drop';
import {ConstantsService} from '../../../core/services/constants.service';

@Component({
  selector: 'app-simple-post',
  templateUrl: './simple-post.component.html',
  styleUrls: ['./simple-post.component.css', '../new-workout/new-workout.component.css', '../../../shared/shared.style.css']
})
export class SimplePostComponent implements OnInit, AfterViewInit{

  url: string;
  private _selectedFile;
  private reader = new FileReader();
  private simplePostDTO: SimplePostDTO = null;
  private _description: string;
  dragPosition: Vector = new Vector(0, 0);
  private cx?: CanvasRenderingContext2D;
  @ViewChild('canvas') canvas;
  @ViewChild('fileInputWrapper') fileInputWrapper;
  @ViewChild('inputImage') inputImage;
  @ViewChild('fileInput') fileInput;

  constructor(
    private simplePostService: SaveSimplePostService,
    private constants: ConstantsService
    ) { }

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
      previewImage: this.url,
      previewImageUrl: 'resources/' + this.constants.getUser.id + '/simple-posts/' + timeNow,
      userDTO: this.constants.getUser
    };
    this.simplePostService.uploadSimpleWorkout(this.simplePostDTO).subscribe(a => {
      console.log(a);
    });

  }

  public canvasDrawing(): void {

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
      /*
      this.cx.canvas.toBlob(a => {
        this.saveWorkoutService.cacheBlob(a);
      });
       */
    };
    // image.src = this.saveWorkoutService.imageUrl;

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
