import {AfterContentInit, AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SaveWorkoutService} from './shared/save-workout.service';
import {Observable} from 'rxjs';
import {CdkDragEnd, CdkDragExit} from '@angular/cdk/drag-drop';
import {ActivatedRoute, Router} from '@angular/router';
import {DayDTO} from '../../../core/model/swagger-model/dayDTO';
import {WorkoutDTO} from '../../../core/model/swagger-model/workoutDTO';
import {ConstantsService} from '../../../core/services/constants.service';
import {PhaseDTO} from '../../../core/model/swagger-model/phaseDTO';
import {Vector} from '../../../core/types/vector';
import {Exercise} from '../../../core/model/internal-model/exercise.model';
import {DragRef, Point} from '@angular/cdk/drag-drop/drag-ref';

@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.css', '../../../shared/shared.style.css']
})
export class NewWorkoutComponent implements OnInit, AfterContentInit, AfterViewInit {

  form: FormGroup;
  currentFile: File;
  message = '';
  fileInfos: Observable<any>;
  url: string;

  dragPosition: Vector = new Vector(0, 0);
  days: DayDTO[] = [];
  selectedDay = 0;
  selectedPhase = 0;

  @ViewChild('canvas') canvas;
  @ViewChild('inputImage') inputImage;
  @ViewChild('fileInputWrapper') fileInputWrapper;
  @ViewChild('fileInput') fileInput;
  private cx?: CanvasRenderingContext2D;

  private reader = new FileReader();

  private _allDays: DayDTO[];
  private _allPhases: PhaseDTO[];
  private _currentlySelectedPhase: PhaseDTO;

  private _expandedExercise: ExerciseExpandPosition = {exerciseNumber: -1, phaseNumber: -1};

  constructor(
    private formBuilder: FormBuilder,
    public saveWorkoutService: SaveWorkoutService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private constantsService: ConstantsService
  ) {
    console.log('new workout constructed');
  }

  ngAfterViewInit(): void {
    this.setFileInputWrapperHeight();
    console.log('new workout after view init');
  }

  ngOnInit(): void {
    console.log('new workout initialized');
    this.initializeInputValues('init text from class bal bla');
  }

  ngAfterContentInit(): void {
    console.log('new workout after ocntennt init');
    this.dragPosition = this.saveWorkoutService.dragPosition;
    if (this.saveWorkoutService.days != null && this.saveWorkoutService.days.length > 0) {
      this.days = this.saveWorkoutService.days;
      this.selectedDay = this.saveWorkoutService.selection.selectedDay;
      this.selectedPhase = this.saveWorkoutService.selection.selectedPhase;
      if (this.days[this.selectedDay].phases[this.selectedPhase].exercises) {
        this.saveWorkoutService.pickedExercises
          .forEach(ex => this.days[this.selectedDay].phases[this.selectedPhase].exercises.push(ex));
      }
    }
    if (this.saveWorkoutService.imageUrl) {
      this.url = this.saveWorkoutService.imageUrl;
    }
    this.loadAllDays();
    this.loadAllPhases();
  }

  private setFileInputWrapperHeight(): void {
    const fileInputWrapperWidth = this.fileInputWrapper.nativeElement.offsetWidth;
    this.fileInputWrapper.nativeElement.style.height = (fileInputWrapperWidth / 4 * 3);
  }

  public canvasDrawing(): void {
    console.log('lets see');
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

      const workoutImageBase64 = this.cx.canvas.toDataURL('image/jpeg', 0.5);
      this.saveWorkoutService.cacheWorkoutImage(workoutImageBase64);

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
      const workoutImageBase64 = this.cx.canvas.toDataURL('image/jpeg', 0.5);
      this.saveWorkoutService.cacheWorkoutImage(workoutImageBase64);
    };
    image.src = this.url;
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
    this.saveWorkoutService.cacheDragPosition(this.dragPosition);
  }

  setTimeLength(event, exercise: Exercise): void {
    const timeLength = event.target.value;
    exercise.timeLength = timeLength;
    /*
        this.reader.onload = (file: any) => {
          this.url = file.target.result;
          this.saveWorkoutService.cacheFile(selectedFiles.item(0));
          this.saveWorkoutService.cacheUrl(file.target.result);
        };
        this.reader.onerror = (file: any) => {
          console.log('File could not be read: ' + file.target.error.code);
        };
        this.reader.readAsDataURL(event.target.files[0]);
    */
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
      // convert(this.this.constant.getUser): UserDTO
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
    const nextDay = this.allDays[nextNumber];
    this.days.push(nextDay);
  }

  addPhase(): void {
    const nextPhaseNumber = this.days[this.selectedDay].phases.length;
    const initialPhaseDTO: PhaseDTO = this.allPhases[nextPhaseNumber];
    this.days[this.selectedDay].phases.push({id: initialPhaseDTO.id, name: initialPhaseDTO.name, order: nextPhaseNumber, exercises: []});
  }

  setSelectedDay(selectedDay: number): void {
    this._expandedExercise = {exerciseNumber: -1, phaseNumber: -1};
    this.selectedDay = selectedDay;
  }

  public goToExerciseSelector(selectedPhase: number): void {
    this.saveWorkoutService.cacheDays(this.days);
    this.saveWorkoutService.cacheSelection({selectedDay: this.selectedDay, selectedPhase});
    this.router.navigate(['./exercises'], {relativeTo: this.activatedRoute});
  }

  private loadAllDays(): void {
    this.saveWorkoutService.getDayEnum().subscribe(days =>
      this._allDays = days.sort((a, b) => a.id - b.id));
  }

  private loadAllPhases(): void {
    this.saveWorkoutService.getPhaseEnum().subscribe(phases => {
        this._allPhases = phases.sort((a, b) => a.id - b.id);
        this._currentlySelectedPhase = phases[0];
      }
    );
  }

  get allDays(): DayDTO[] {
    return this._allDays;
  }

  get allPhases(): PhaseDTO[] {
    return this._allPhases;
  }

  get currentlySelectedPhase(): PhaseDTO {
    return this._currentlySelectedPhase;
  }

  selectPhase(phaseNumberOfDay: number, phase: PhaseDTO): void {
    this._currentlySelectedPhase = phase;
    this.days[this.selectedDay].phases[phaseNumberOfDay] = {id: phase.id, name: phase.name, order: phaseNumberOfDay, exercises: []};
  }

  removeImage(): void {
    this.url = null;
    this.dragPosition = new Vector(0, 0);
    this.saveWorkoutService.removeImage();
    this.fileInput.nativeElement.value = '';
  }

  openExercise(exerciseNumber: number, phaseNumber: number): void {
    this._expandedExercise = {exerciseNumber, phaseNumber};
  }

  get expandedExercise(): ExerciseExpandPosition {
    return this._expandedExercise;
  }

  setUserRequired(exercise: Exercise, userEntryRequired: boolean): void {
    exercise.userEntryRequired = userEntryRequired;
  }

  setTimeBased(exercise: Exercise, timeBased: boolean): void {
    exercise.timeBased = timeBased;
  }

  setWeightIncluded(exercise: Exercise, weight: boolean): void {
    exercise.weight = weight;
  }
}

export interface ExerciseExpandPosition {
  exerciseNumber: number;
  phaseNumber: number;
}
