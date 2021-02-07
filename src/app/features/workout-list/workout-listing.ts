import {Workout} from '../../core/model/internal-model/workout.model';

export interface WorkoutListing {
  workout: Workout;
  isCollapsed: boolean;
  toggleImage: string;
}
