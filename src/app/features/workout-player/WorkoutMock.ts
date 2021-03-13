import {Day} from '../../core/model/internal-model/day.model';
import {Phase} from '../../core/model/internal-model/phase.model';
import {Exercise} from '../../core/model/internal-model/exercise.model';
import {ExerciseSetContainerDTO} from '../../core/model/swagger-model/exerciseSetContainerDTO';
import {SafeResourceUrl} from '@angular/platform-browser';
import {ExerciseSetDTO} from '../../core/model/swagger-model/exerciseSetDTO';

export class WorkoutMock {

  private exerciseSet: ExerciseSetDTO = {
    id: 1,
    weight: 35,
    repetitions: 12
};

  private _setsContainer: ExerciseSetContainerDTO = {
    timeOfExercise: new Date(),
    exerciseSets: [this.exerciseSet, this.exerciseSet]
  };

  private _exercise1: Exercise = {
    id: 1,
    name: 'squats',
    setsContainer: [this._setsContainer, this._setsContainer],
    order: 1,
    videoUrl: 'www.url.com',
    image: '',
    userEntryRequired: true,
    timeLength: 20,
    timeBased: true,
    weight: false,
    videoSrc: null
  };
  private _exercise2: Exercise = {
    id: 2,
    name: 'push ups',
    setsContainer: [this._setsContainer, this._setsContainer],
    order: 2,
    videoUrl: 'www.url.com',
    image: '',
    userEntryRequired: true,
    timeLength: 20,
    timeBased: false,
    weight: true,
    videoSrc: null
  };
  private _phases1: Phase = {
    id: 1,
    name: 'warmUp',
    exercises: [this._exercise1, this._exercise2],
    order: 1
  };

  private _phases2: Phase = {
    id: 1,
    name: 'strength',
    exercises: [this._exercise1, this._exercise2],
    order: 1
  };

  private _day: Day = {
    id: 1,
    name: 'monday',
    phases: [this._phases1, this._phases2]
  };
  get day(): Day {
    return this._day;
  }
}
