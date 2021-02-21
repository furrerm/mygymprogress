import {Injectable} from '@angular/core';
import {Workout} from '../../../core/model/internal-model/workout.model';
import {WorkoutsService} from './workouts.service';
import {WorkoutOverviewPicturesService} from '../../workoutoverview/shared/workout-overview-pictures.service';
import {BehaviorSubject, EMPTY, from, observable, Observable, of, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {WorkoutDTO} from '../../../core/model/swagger-model/workoutDTO';
import {WorkoutConverter} from '../../../core/model/converter/workout-converter';

@Injectable({
  providedIn: 'root'
})
export class SavedWorkoutsService {
  readonly _savedWorkouts: BehaviorSubject<Workout[]>;

  constructor(
    private workoutsService: WorkoutsService,
    private workoutpreviewpicturesService: WorkoutOverviewPicturesService) {
    this._savedWorkouts = new BehaviorSubject<Workout[]>([]);
  }

  public get savedWorkouts(): Observable<Workout[]> {
    return this._savedWorkouts;
  }


  public initializeWorkouts(reload: boolean): void {
    console.log(this);
    if (reload) {
      let workoutsLocal: Workout[] = [];
      this.workoutsService.fetchWorkouts().subscribe((data: WorkoutDTO[]) => {

        workoutsLocal = new WorkoutConverter().convertDTOToWorkout(data);
        workoutsLocal = workoutsLocal.sort((a, b) => a.id - b.id);
        this._savedWorkouts.next(workoutsLocal);
        for (const i in workoutsLocal) {
          if (data.hasOwnProperty(i)) {
            console.log(workoutsLocal[i]);
            this.workoutpreviewpicturesService.getFiles(i, workoutsLocal[i].imageUrl).image.subscribe(data2 => {
              this.addImagesToWorkouts(data2, i, workoutsLocal);
            });
          }
        }
      });
    }
  }

  public initializeWorkoutsWithSearchCriteria(): void {
    let workoutsLocal: Workout[] = [];
    this.workoutsService.fetchWorkoutsWithSearchCriteria().subscribe((data: WorkoutDTO[]) => {

      workoutsLocal = new WorkoutConverter().convertDTOToWorkout(data);
      workoutsLocal = workoutsLocal.sort((a, b) => a.id - b.id);
      this._savedWorkouts.next(workoutsLocal);
      for (const i in workoutsLocal) {
        if (data.hasOwnProperty(i)) {
          console.log(workoutsLocal[i]);
          this.workoutpreviewpicturesService.getFiles(i, workoutsLocal[i].imageUrl).image.subscribe(data2 => {
            this.addImagesToWorkouts(data2, i, workoutsLocal);
          });
        }
      }
    });

  }

  addImagesToWorkouts(image: Blob, position, workouts): void {
    const reader = new FileReader();
    reader.addEventListener('load',
      () => {
        workouts[position].image = reader.result;
        this._savedWorkouts.next(workouts);
      },
      false);
    if (image) {
      if (image.type !== 'application/pdf') {
        reader.readAsDataURL(image);
      }
    }
  }
}
