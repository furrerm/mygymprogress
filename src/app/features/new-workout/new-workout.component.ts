import {AfterContentInit, Component, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SaveWorkoutService} from './shared/save-workout.service';
import {Observable} from 'rxjs';
import {HttpEventType, HttpResponse} from '@angular/common/http';
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
export class NewWorkoutComponent implements OnInit, AfterContentInit {

  form: FormGroup;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  fileInfos: Observable<any>;
  url: string;

  dragPosition = {x: 0, y: 0};
  days: DayDTO[] = [];
  selectedDay = 0;
  selectedPhase = 0;


  constructor(
    private formBuilder: FormBuilder,
    private saveWorkoutService: SaveWorkoutService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private constantsService: ConstantsService
  ) {
  }

  ngOnInit() {
    this.initializeInputValues('init text from class bal bla');

  }

  ngAfterContentInit() {

    if (localStorage.getItem('createdDays') != null && localStorage.getItem('createdDays').length > 0) {
      this.days = JSON.parse(localStorage.getItem('createdDays'));
      this.selectedDay = JSON.parse(localStorage.getItem('selectedDay'));
      this.selectedPhase = JSON.parse(localStorage.getItem('selectedPhase'));
      if (this.days[this.selectedDay].phases[this.selectedPhase].exercises) {
        JSON.parse(localStorage.getItem('chosenExercises'))
          .forEach(ex => this.days[this.selectedDay].phases[this.selectedPhase].exercises.push(ex));
        // this.days[this.selectedDay].phases[this.selectedPhase].exercises = JSON.parse(localStorage.getItem('chosenExercises'));
      }
    }
  }

  onSubmit(form: FormGroup) {
    const workoutName: string = form.get('workoutName').value;
    console.log(workoutName);
    form.reset();
  }

  private initializeInputValues(initText: string) {
    this.form = this.formBuilder.group({
      workoutName: initText
    });
  }

  dragTheImage(event: CdkDragEnd) {
    const width = document.getElementById('file-input-image').offsetWidth;
    const height = document.getElementById('file-input-image').offsetHeight;
    const wrapperWidth = document.getElementById('file-input-wrapper').offsetWidth;
    const wrapperHeight = document.getElementById('file-input-wrapper').offsetHeight;
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
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    const reader = new FileReader();
    reader.onload = (file: any) => {
      this.url = file.target.result;
    };
    reader.onerror = (file: any) => {
      console.log('File could not be read: ' + file.target.error.code);
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  upload() {
    this.currentFile = this.selectedFiles.item(0);
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
    this.selectedFiles = undefined;
    this.router.navigate(['./description'], {relativeTo: this.activatedRoute});
  }

  private createWorkout() {
    const workoutDTO: WorkoutDTO = {id: null, name: 'testName', creator: null, previewImageUrl: this.currentFile.name, days: this.days};

  }

  addDay() {
    const nextNumber = this.days.length;
    this.selectedDay = nextNumber;
    this.days.push({id: 0, name: 'day' + nextNumber, phases: []});
  }

  addPhase() {
    const nextPhaseNumber = this.days[this.selectedDay].phases.length;
    this.days[this.selectedDay].phases.push({id: 0, name: 'phase' + nextPhaseNumber, exercises: []});
  }

  setSelectedDay(selectedDay: number) {
    this.selectedDay = selectedDay;
    console.log(this.days[this.selectedDay].phases[this.selectedPhase]);
  }

  public goToExerciseSelector(selectedPhase: number) {
    localStorage.setItem('createdDays', JSON.stringify(this.days));
    localStorage.setItem('selectedDay', JSON.stringify(this.selectedDay));
    localStorage.setItem('selectedPhase', JSON.stringify(selectedPhase));
    this.router.navigate(['./exercises'], {relativeTo: this.activatedRoute});
  }
}
