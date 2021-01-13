import {AfterContentInit, Component, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SaveWorkoutService} from './shared/save-workout.service';
import {Observable} from 'rxjs';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {CdkDragEnd} from '@angular/cdk/drag-drop';
import {ActivatedRoute, Router} from '@angular/router';

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
  days = [];
  selectedDay = 0;
  selectedPhase = 0;


  constructor(
    private formBuilder: FormBuilder,
    private saveWorkoutService: SaveWorkoutService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
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
        JSON.parse(localStorage.getItem('chosenExercises')).forEach(ex => this.days[this.selectedDay].phases[this.selectedPhase].exercises.push(ex.name));
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
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    this.saveWorkoutService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log(event);
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          console.log(event);
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });

    this.selectedFiles = undefined;
  }

  addDay() {
    const nextNumber = this.days.length;
    this.selectedDay = nextNumber;
    this.days.push({dayName: 'day' + nextNumber, phases: []});
  }

  addPhase() {
    const nextPhaseNumber = this.days[this.selectedDay].phases.length;
    this.days[this.selectedDay].phases.push({name: 'phase' + nextPhaseNumber, exercises: []});
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
