import {AfterContentInit, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SaveWorkoutService} from './shared/save-workout.service';
import {Observable} from 'rxjs';
import {CdkDragEnd} from '@angular/cdk/drag-drop';
import {ActivatedRoute, Router} from '@angular/router';
import {DayDTO} from '../../core/model/swagger-model/dayDTO';
import {WorkoutDTO} from '../../core/model/swagger-model/workoutDTO';
import {ConstantsService} from '../../core/services/constants.service';

@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.css', '../../shared/shared.style.css']
})
export class NewWorkoutComponent implements OnInit, AfterContentInit, AfterViewInit {

  form: FormGroup;
  currentFile: File;
  message = '';
  fileInfos: Observable<any>;
  url: string;

  dragPosition = {x: 0, y: 0};
  days: DayDTO[] = [];
  selectedDay = 0;
  selectedPhase = 0;

  @ViewChild('canvas') canvas;
  @ViewChild('inputImage') inputImage;
  @ViewChild('fileInputWrapper') fileInputWrapper;
  private cx?: CanvasRenderingContext2D;

  private reader = new FileReader();

  constructor(
    private formBuilder: FormBuilder,
    public saveWorkoutService: SaveWorkoutService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private constantsService: ConstantsService
  ) {
  }

  ngAfterViewInit(): void {
    this.setFileInputWrapperHeight();
    }

  ngOnInit(): void {
    this.initializeInputValues('init text from class bal bla');
  }

  ngAfterContentInit(): void {

    if (localStorage.getItem('createdDays') != null && localStorage.getItem('createdDays').length > 0) {
      this.days = JSON.parse(localStorage.getItem('createdDays'));
      this.selectedDay = JSON.parse(localStorage.getItem('selectedDay'));
      this.selectedPhase = JSON.parse(localStorage.getItem('selectedPhase'));
      if (this.days[this.selectedDay].phases[this.selectedPhase].exercises) {
        JSON.parse(localStorage.getItem('chosenExercises'))
          .forEach(ex => this.days[this.selectedDay].phases[this.selectedPhase].exercises.push(ex));
      }
    }
    if (this.saveWorkoutService.imageUrl) {
      this.url = this.saveWorkoutService.imageUrl;
    }
  }

  private setFileInputWrapperHeight(): void {
    const fileInputWrapperWidth = this.fileInputWrapper.nativeElement.offsetWidth;
    this.fileInputWrapper.nativeElement.style.height = (fileInputWrapperWidth / 4 * 3);
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
      this.cx.canvas.toBlob(a => {
        this.saveWorkoutService.cacheBlob(a);
      });
    };
    image.src = this.saveWorkoutService.imageUrl;
  }

  private initializeInputValues(initText: string): void {
    this.form = this.formBuilder.group({
      workoutName: initText
    });
  }

  dragTheImage(event: CdkDragEnd): void {
    const width = this.inputImage.nativeElement.offsetWidth;
    const height = this.inputImage.nativeElement.offsetHeight;
    const wrapperWidth = this.fileInputWrapper.nativeElement.offsetWidth;
    const wrapperHeight = this.fileInputWrapper.nativeElement.offsetHeight;
    let marginTop = event.source.getFreeDragPosition().y;
    const marginLeft = event.source.getFreeDragPosition().x;
    this.dragPosition = {x: marginLeft, y: marginTop};
    if (marginTop > 0) {
      this.dragPosition = {x: marginLeft, y: 0};
    } else if (marginTop < 0 && Math.abs(marginTop) > height - wrapperHeight) {
      const res = height - wrapperHeight;
      this.dragPosition = {x: marginLeft, y: -res};
    }
    marginTop = this.dragPosition.y;
    if (marginLeft > 0) {
      this.dragPosition = {x: 0, y: marginTop};
    } else if (marginLeft < 0 && Math.abs(marginLeft) > width - wrapperWidth) {
      const res = width - wrapperWidth;
      this.dragPosition = {x: -res, y: marginTop};
    }
    this.canvasDrawing();
  }

  selectFile(event): void {
    const selectedFiles = event.target.files;

    this.reader.onload = (file: any) => {
      this.url = file.target.result;
      this.saveWorkoutService.cacheFile(selectedFiles.item(0));
      this.saveWorkoutService.cacheUrl(file.target.result);
    };
    this.reader.onerror = (file: any) => {
      console.log('File could not be read: ' + file.target.error.code);
    };
    this.reader.readAsDataURL(event.target.files[0]);
  }

  upload(): void {
    this.currentFile = this.saveWorkoutService.file;
    // todo: workout dto erstellen
    const workoutDTO: WorkoutDTO = {
      id: null,
      name: 'hans',
      previewImageUrl: 'user1/workout1/titleImage.png',
      // todo: preview low quality image must get stored in db
      previewImage: null,
      // convert(this.constantsService.getUser): UserDTO
      creator: this.constantsService.getUser,
      days: this.days
    };
    this.saveWorkoutService.cacheWorkout(workoutDTO);
    this.saveWorkoutService.cacheFile(this.currentFile);
    this.router.navigate(['./description'], {relativeTo: this.activatedRoute});
  }

  addDay(): void {
    const nextNumber = this.days.length;
    this.selectedDay = nextNumber;
    this.days.push({id: 0, name: 'day' + nextNumber, phases: []});
  }

  addPhase(): void {
    const nextPhaseNumber = this.days[this.selectedDay].phases.length;
    this.days[this.selectedDay].phases.push({id: 0, name: 'phase' + nextPhaseNumber, exercises: []});
  }

  setSelectedDay(selectedDay: number): void {
    this.selectedDay = selectedDay;
  }

  public goToExerciseSelector(selectedPhase: number): void {
    localStorage.setItem('createdDays', JSON.stringify(this.days));
    localStorage.setItem('selectedDay', JSON.stringify(this.selectedDay));
    localStorage.setItem('selectedPhase', JSON.stringify(selectedPhase));
    this.router.navigate(['./exercises'], {relativeTo: this.activatedRoute});
  }
}
