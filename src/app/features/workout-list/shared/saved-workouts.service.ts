import {Injectable} from '@angular/core';
import {Workout} from '../../../core/model/internal-model/workout.model';
import {WorkoutsService} from './workouts.service';
import {WorkoutpreviewpicturesService} from '../../workoutoverview/shared/workoutpreviewpictures.service';
import {BehaviorSubject, EMPTY, from, observable, Observable, of, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {WorkoutDTO} from '../../../core/model/swagger-model/workoutDTO';

@Injectable({
  providedIn: 'root'
})
export class SavedWorkoutsService {
  public savedWorkouts: BehaviorSubject<Workout[]>;

  constructor(private workoutsService: WorkoutsService,
              private workoutpreviewpicturesService: WorkoutpreviewpicturesService) {
    this.savedWorkouts = new BehaviorSubject<Workout[]>([]);
  }

  public get getSavedWorkouts(): Observable<Workout[]> {
    return this.savedWorkouts;
  }
  public initializeWorkouts() {
    if (this.savedWorkouts.getValue().length === 0) {
      let workoutsLocal: Workout[] = [];
      this.workoutsService.fetchWorkouts().subscribe((data: WorkoutDTO[]) => {
        workoutsLocal = this.convertJsonDataToWorkouts(data);
        workoutsLocal = workoutsLocal.sort((a, b) => a.id - b.id);
        this.savedWorkouts.next(workoutsLocal);
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

  addImagesToWorkouts(image: Blob, position, workouts) {
    const reader = new FileReader();
    reader.addEventListener('load',
      () => {
        workouts[position].image = reader.result;
        this.savedWorkouts.next(workouts);
      },
      false);
    if (image) {
      if (image.type !== 'application/pdf') {
        reader.readAsDataURL(image);
      }
    }
  }

  convertJsonDataToWorkouts(inputData: WorkoutDTO[]) {
    const innerWorkouts: Workout[] = [];
    const workoutsAsJson = inputData;

    workoutsAsJson.forEach(x => {
      innerWorkouts.push({
        image: undefined,
        id: x.id,
        name: x.name,
        imageUrl: x.previewImageUrl,
        creatorId: x.id,
        isCollapsed: true,
        days: x.days.map(a => ({
            id: a.id,
            name: a.name,
            phases: a.phases.map(b => ({
              id: b.id,
              name: b.name,
              exercises: b.exercises.map(c => ({
                id: c.id,
                name: c.name
              }))
            }))
          })
        ),
        toggleImage: '../../assets/pictures/menuButtons/toggle_open.png'
      });
    });
    return innerWorkouts;
  }
}
