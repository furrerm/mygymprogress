import {DayWorkoutHandler, DayWorkoutHandlerExerciseBased} from './DayWorkoutHandler';
import {Workout} from '../../core/model/internal-model/workout.model';
import {LastSetService} from './shared/last-set.service';
import {DayDTO} from '../../core/model/swagger-model/dayDTO';

export class DayWorkoutHandlerFactory {
  private savedWorkouts: Workout[];

  constructor(savedWorkouts: Workout[],
              private lastSetService: LastSetService) {
    this.savedWorkouts = savedWorkouts;
  }
}
