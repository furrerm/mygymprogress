import {DayWorkoutHandler, DayWorkoutHandlerExerciseBased} from './DayWorkoutHandler';
import {SavedWorkouts} from '../saved-workouts.Workout';
import {LastSetService} from './last-set.service';
import {DayDTO} from '../../../common/model/swagger-model/dayDTO';

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
