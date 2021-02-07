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

  createDayWorkoutHandlerFromIds(workoutId: number, dayId: number): DayWorkoutHandler {
    const dayWorkout: DayDTO = this.savedWorkouts?.find(a => a.id === workoutId)?.days?.find(a => a.id === dayId);
    const dayWorkoutHandler: DayWorkoutHandler = new DayWorkoutHandlerExerciseBased(dayWorkout, this.lastSetService);
    return dayWorkoutHandler;
  }
}
