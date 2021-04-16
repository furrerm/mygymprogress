import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {FilterGroupDTO} from '../model/swagger-model/filterGroupDTO';
import {ConstantsService} from './constants.service';
import {FilterService} from './filter.service';
import {Workout} from '../model/internal-model/workout.model';
import {Day} from '../model/internal-model/day.model';
import {WorkoutDTO} from '../model/swagger-model/workoutDTO';
import {HttpHeaders} from '@angular/common/http';
import {SavedWorkoutsService} from './saved-workouts.service';
import {WorkoutConverter} from '../model/converter/workout-converter';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  exerciseFilterGroups: BehaviorSubject<FilterGroupDTO[]> = new BehaviorSubject<FilterGroupDTO[]>([]);
  workoutFilterGroups: BehaviorSubject<FilterGroupDTO[]> = new BehaviorSubject<FilterGroupDTO[]>([]);
  interestFilterGroups: BehaviorSubject<FilterGroupDTO[]> = new BehaviorSubject<FilterGroupDTO[]>([]);
  readonly savedWorkouts: BehaviorSubject<Workout[]> = new BehaviorSubject<Workout[]>([]);
  dayToPlay: Day;

  constructor(
    private constants: ConstantsService,
    private filterService: FilterService,
    private savedWorkoutsService: SavedWorkoutsService,
    private sanitizer: DomSanitizer) {
  }

  getExerciseFilters(): BehaviorSubject<FilterGroupDTO[]> {
    return this.exerciseFilterGroups;
  }

  loadExerciseFilters(): void {
    this.filterService.getAllExerciseFilterGroups().subscribe(filterGroups => {
      this.exerciseFilterGroups.next(filterGroups);
    });
  }

  getWorkoutFilters(): BehaviorSubject<FilterGroupDTO[]> {
    return this.workoutFilterGroups;
  }

  loadWorkoutFilters(): void {
    this.filterService.getAllWorkoutFilterGroups().subscribe(filterGroups => {
      this.workoutFilterGroups.next(filterGroups);
    });
  }

  public addWorkout(workout: Workout): void {
    const workouts: Workout[] = this.savedWorkouts.getValue();
    // todo: if workouts empty initialize and add if not already in
    workouts.push(workout);
    this.savedWorkouts.next(workouts);
  }

  public remove(workout: Workout): void {
    const workouts: Workout[] = this.savedWorkouts.getValue().filter(a => a.id !== workout.id);
    this.savedWorkouts.next(workouts);
  }
  cacheWorkoutDayToPlay(day: Day): void {
    this.dayToPlay = day;
  }

  initialLoadSavedWorkouts(): void {
    this.savedWorkoutsService.fetchWorkouts().subscribe(workouts => {
      const workoutConverter: WorkoutConverter = new WorkoutConverter(this.sanitizer);
      this.savedWorkouts.next(workoutConverter.convertDTOsToWorkouts(workouts));
    });
  }

  getSavedWorkouts(): BehaviorSubject<Workout[]> {
    if (this.savedWorkouts.getValue().length === 0) {
      this.initialLoadSavedWorkouts();
    }
    return this.savedWorkouts;
  }
}
