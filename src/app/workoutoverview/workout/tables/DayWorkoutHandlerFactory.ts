import {DayWorkoutHandler, DayWorkoutHandlerExerciseBased} from './DayWorkoutHandler';
import {Day, SavedWorkouts} from '../saved-workouts.Workout';
import {LastSetService} from './last-set.service';

export class DayWorkoutHandlerFactory {
  private savedWorkouts: SavedWorkouts[];

  constructor(savedWorkouts: SavedWorkouts[],
              private lastSetService: LastSetService) {
    // todo: These Savedworkouts are Object[] yet. Convert before give to this constructor.
    this.savedWorkouts = savedWorkouts;
  }

  createDayWorkoutHandlerFromIds(workoutId: number, dayId: number): DayWorkoutHandler {
    const dayWorkout: Day = this.savedWorkouts?.find(a => a.id === workoutId).days?.find(a => a.id === dayId);
    const dayWorkoutHandler: DayWorkoutHandler = new DayWorkoutHandlerExerciseBased(dayWorkout, this.lastSetService);
    return dayWorkoutHandler;
  }
}
