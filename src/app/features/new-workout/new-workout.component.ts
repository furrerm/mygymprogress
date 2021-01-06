import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SaveWorkoutService} from './shared/save-workout.service';
import {Observable} from 'rxjs';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {CdkDragEnd} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.css', '../../shared/shared.style.css']
})
export class NewWorkoutComponent implements OnInit {
  form: FormGroup;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  fileInfos: Observable<any>;
  url: string;
  lockAx = 'y';
  lockAx2 = 'x';

  dragPosition = {x: 0, y: 0};

  constructor(private formBuilder: FormBuilder, private saveWorkoutService: SaveWorkoutService) { }

  ngOnInit() {
    this.initializeInputValues('init text from class bal bla');
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
  setImageSize(){
    const width = document.getElementById('file-input-image').offsetWidth;
    const height = document.getElementById('file-input-image').offsetHeight;

    const wrapperWidth = document.getElementById('file-input-wrapper').offsetWidth;
    const wrapperHeight = document.getElementById('file-input-wrapper').offsetHeight;

    if (height > wrapperWidth && width > wrapperWidth) {
      if (width - wrapperWidth > height - wrapperHeight){
        document.getElementById('file-input-image').style.maxWidth = wrapperWidth + 'px';
      } else {
        document.getElementById('file-input-image').style.maxHeight = wrapperHeight + 'px';
      }
    }
  }
  dragTheImage(event: CdkDragEnd){
    const width = document.getElementById('file-input-image').offsetWidth;
    const height = document.getElementById('file-input-image').offsetHeight;
    const wrapperWidth = document.getElementById('file-input-wrapper').offsetWidth;
    const wrapperHeight = document.getElementById('file-input-wrapper').offsetHeight;
    const marginTop = event.source.getFreeDragPosition().y;

    if (marginTop > 0) {
      this.dragPosition = {x: 0, y: 0};
    } else if (marginTop < 0 && Math.abs(marginTop) > height - wrapperHeight) {
      const res = height - wrapperHeight;
      this.dragPosition = {x: 0, y: -res};
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

}
