import {BehaviorSubject, Observable} from 'rxjs';
import {Workout} from '../../../core/model/internal-model/workout.model';

export interface WorkoutListingsInterface {
  readonly _savedWorkouts: BehaviorSubject<Workout[]>;
  savedWorkouts: () => Observable<Workout[]>;
}
