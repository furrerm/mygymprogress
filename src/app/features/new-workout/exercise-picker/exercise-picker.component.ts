import {Component, OnInit} from '@angular/core';
import {ExerciseDTO} from '../../../core/model/swagger-model/exerciseDTO';
import {AllExercisesService} from './shared/all-exercises.service';

@Component({
  selector: 'app-exercise-picker',
  templateUrl: './exercise-picker.component.html',
  styleUrls: ['./exercise-picker.component.css',
    '../../../shared/shared.style.css']
})
export class ExercisePickerComponent implements OnInit {

  private exercises: ExerciseDTO[] = [];

  constructor(private allExercises: AllExercisesService) {
  }

  ngOnInit(): void {
    this.getAllExercises();
  }

  public getExercise() {
    return this.exercises;
  }

  private getAllExercises() {
    this.allExercises.getAllExercises().subscribe(data => {
      this.exercises.push(data);
    });
  }

}
