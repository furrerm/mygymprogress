import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.css']
})
export class NewWorkoutComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

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
}
