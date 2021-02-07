import {Workout} from '../../core/model/internal-model/workout.model';

class WorkoutListing {
  private _workout: Workout;
  private _isCollapsed: boolean;


  get workout(): Workout {
    return this._workout;
  }

  set workout(value: Workout) {
    this._workout = value;
  }

  get isCollapsed(): boolean {
    return this._isCollapsed;
  }

  set isCollapsed(value: boolean) {
    this._isCollapsed = value;
  }
}
