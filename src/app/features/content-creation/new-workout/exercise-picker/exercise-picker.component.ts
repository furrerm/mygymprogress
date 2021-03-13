import {Component, OnInit} from '@angular/core';
import {ExerciseDTO} from '../../../../core/model/swagger-model/exerciseDTO';
import {AllExercisesService} from './shared/all-exercises.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SavedWorkoutsService} from '../../../workout-list/shared/saved-workouts.service';
import {SaveWorkoutService} from '../shared/save-workout.service';
import {FilterGroupDTO} from '../../../../core/model/swagger-model/filterGroupDTO';
import {FilterService} from '../../../../core/services/filter.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-exercise-picker',
  templateUrl: './exercise-picker.component.html',
  styleUrls: ['./exercise-picker.component.css',
    '../../../../shared/shared.style.css']
})
export class ExercisePickerComponent implements OnInit {

  private exercises: ExerciseDTO[] = [];
  private chosenExercises: ExerciseDTO[] = [];
  private exerciseOrder = 0;
  private filterGroups: FilterGroupDTO[] = [];

  constructor(
    private allExercises: AllExercisesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private saveWorkoutService: SaveWorkoutService,
    private filterService: FilterService
  ) {
  }

  ngOnInit(): void {
    this.getAllExercises();
    this.getAllFilterGroups();
  }

  public getExercise() {
    return this.exercises;
  }

  private getAllExercises(): void {
    this.allExercises.getAllExercises().subscribe(data => {
      this.exercises = data;
    });
  }

  private getAllFilterGroups(): void {
    this.filterService.getAllFilterGroups().subscribe(filterGroups => {
      this.filterGroups = filterGroups;
    });
  }

  public done() {
    this.saveWorkoutService.cachePickedExercises(this.chosenExercises);
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
