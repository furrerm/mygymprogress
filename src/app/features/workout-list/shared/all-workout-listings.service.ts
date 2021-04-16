import {Injectable} from '@angular/core';
import {WorkoutListingsInterface} from './workout-listings-interface';
import {BehaviorSubject, Observable} from 'rxjs';
import {Workout} from '../../../core/model/internal-model/workout.model';
import {WorkoutDTO} from '../../../core/model/swagger-model/workoutDTO';
import {WorkoutConverter} from '../../../core/model/converter/workout-converter';
import {WorkoutsService} from './workouts.service';
import {WorkoutOverviewPicturesService} from '../../workoutoverview/shared/workout-overview-pictures.service';
import {ConstantsService} from '../../../core/services/constants.service';
import {ImageObservable} from '../../workoutoverview/workoutoverview.component';

@Injectable({
  providedIn: 'root'
})
export class AllWorkoutListingsService implements WorkoutListingsInterface {

  constructor(
    private workoutsService: WorkoutsService,
  ) {
    this._savedWorkouts = new BehaviorSubject<Workout[]>([]);
  }

  readonly _savedWorkouts: BehaviorSubject<Workout[]>;

  public savedWorkouts(filters: Array<string>): Observable<Workout[]> {
    const workoutFetcher: (endpointEssentials: ConstantsService, filters: Array<string>) =>
      Observable<WorkoutDTO[]> = this.workoutsService.fetchWorkoutsWithSearchCriteria;
    this.workoutsService.initializeWorkouts(this._savedWorkouts, workoutFetcher, filters);
    return this._savedWorkouts;
  }
}
