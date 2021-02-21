import {Component, OnInit} from '@angular/core';
import {ExerciseDTO} from '../../../core/model/swagger-model/exerciseDTO';
import {AllExercisesService} from './shared/all-exercises.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-exercise-picker',
  templateUrl: './exercise-picker.component.html',
  styleUrls: ['./exercise-picker.component.css',
    '../../../shared/shared.style.css']
})
export class ExercisePickerComponent implements OnInit {

  private exercises: ExerciseDTO[] = [];
  private chosenExercises: ExerciseDTO[] = [];
  private exerciseOrder = 0;

  constructor(
    private allExercises: AllExercisesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getAllExercises();
  }

  public getExercise() {
    return this.exercises;
  }

  private getAllExercises() {
    this.allExercises.getAllExercises().subscribe(data => {
      this.exercises = data;

    });
  }

  public done() {

    localStorage.setItem('chosenExercises', JSON.stringify(this.chosenExercises));
    this.router.navigate(['./..'], {relativeTo: this.activatedRoute});
  }

  public selectExercise(exerciseId: number): void {
    const exercise = this.exercises.find(a => a.id === exerciseId);
    this.chosenExercises.push({id: exercise.id, name: exercise.name, order: this.exerciseOrder, setsContainer: []});
    ++this.exerciseOrder;

  }

  public isExerciseChosen(exercise: ExerciseDTO) {
    return this.chosenExercises.filter(a => a.id === exercise.id).length > 0;
  }

}
