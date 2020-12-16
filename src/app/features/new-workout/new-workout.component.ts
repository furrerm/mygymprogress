import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SaveWorkoutService} from './shared/save-workout.service';
import {Observable} from 'rxjs';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.css']
})
export class NewWorkoutComponent implements OnInit {
  form: FormGroup;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  fileInfos: Observable<any>;
  constructor(private formBuilder: FormBuilder, private saveWorkoutService: SaveWorkoutService) { }

  ngOnInit() {
    this.initializeInputValues('init text from class bal bla');
    // this.fileInfos = this.saveWorkoutService.getFiles();
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
  selectFile(event) {
    this.selectedFiles = event.target.files;
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

}
