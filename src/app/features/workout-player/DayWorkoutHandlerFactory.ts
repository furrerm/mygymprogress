import {DayWorkoutHandler, DayWorkoutHandlerExerciseBased} from './DayWorkoutHandler';
import {SavedWorkouts} from '../workout-list/shared/saved-workouts.model';
import {LastSetService} from './shared/last-set.service';
import {DayDTO} from '../../core/model/swagger-model/dayDTO';

export class DayWorkoutHandlerFactory {
  private savedWorkouts: SavedWorkouts[];

  constructor(savedWorkouts: SavedWorkouts[],
              private lastSetService: LastSetService) {
    this.savedWorkouts = savedWorkouts;
  }

  createDayWorkoutHandlerFromIds(workoutId: number, dayId: number): DayWorkoutHandler {
    const dayWorkout: DayDTO = this.savedWorkouts?.find(a => a.id === workoutId)?.days?.find(a => a.id === dayId);
    const dayWorkoutHandler: DayWorkoutHandler = new DayWorkoutHandlerExerciseBased(dayWorkout, this.lastSetService);
    return dayWorkoutHandler;
  }
}
