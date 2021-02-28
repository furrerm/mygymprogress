import {Injectable} from '@angular/core';
import {Workout} from '../../../core/model/internal-model/workout.model';
import {WorkoutsService} from './workouts.service';
import {WorkoutOverviewPicturesService} from '../../workoutoverview/shared/workout-overview-pictures.service';
import {BehaviorSubject, EMPTY, from, observable, Observable, of, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {WorkoutDTO} from '../../../core/model/swagger-model/workoutDTO';
import {WorkoutConverter} from '../../../core/model/converter/workout-converter';
import {WorkoutListingsInterface} from './workout-listings-interface';
import {ConstantsService} from '../../../core/services/constants.service';
import {ImageObservable} from '../../workoutoverview/workoutoverview.component';

@Injectable({
  providedIn: 'root'
})
export class SavedWorkoutsService implements WorkoutListingsInterface{
  readonly _savedWorkouts: BehaviorSubject<Workout[]>;

  constructor(
    private workoutsService: WorkoutsService,
    private workoutpreviewpicturesService: WorkoutOverviewPicturesService,
    private constants: ConstantsService
  ) {
    this._savedWorkouts = new BehaviorSubject<Workout[]>([]);
  }
  public savedWorkouts(): Observable<Workout[]> {
    const workoutFetcher: (endpointEssentials: ConstantsService) =>
      Observable<WorkoutDTO[]> = this.workoutsService.fetchWorkouts;
    const imageAdder: (imagePosition: number, url1: string, constants: ConstantsService) =>
      ImageObservable = this.workoutpreviewpicturesService.getFiles;
    if (this._savedWorkouts.getValue().length === 0) {
      this.workoutsService.initializeWorkouts(this._savedWorkouts, workoutFetcher, imageAdder);
    }
    return this._savedWorkouts;
  }

  public addWorkout(workout: Workout): void {
    const workouts: Workout[] = this._savedWorkouts.getValue();
    // todo: if workouts empty initialize and add if not already in
    workouts.push(workout);
    this._savedWorkouts.next(workouts);
  }

  public remove(workout: Workout): void {
    const workouts: Workout[] = this._savedWorkouts.getValue().filter(a => a.id !== workout.id);
    this._savedWorkouts.next(workouts);
  }
}
