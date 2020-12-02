import {Injectable} from '@angular/core';
import {SavedWorkouts} from './saved-workouts.Workout';
import {WorkoutsService} from './workouts.service';
import {WorkoutpreviewpicturesService} from '../workoutpreviewpictures.service';
import {BehaviorSubject, EMPTY, from, observable, Observable, of, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SavedWorkoutsService {
  public savedWorkouts: BehaviorSubject<SavedWorkouts[]>;

  constructor(private workoutsService: WorkoutsService,
              private workoutpreviewpicturesService: WorkoutpreviewpicturesService) {
    this.savedWorkouts = new BehaviorSubject<SavedWorkouts[]>([]);
  }

  public get getSavedWorkouts(): Observable<SavedWorkouts[]> {
    return this.savedWorkouts;
  }
  public initializeWorkouts() {
    if (this.savedWorkouts.getValue().length === 0) {
      console.log('in the shit');
      let workoutsLocal: SavedWorkouts[] = [];
      this.workoutsService.fetchWorkouts().subscribe(data => {
        // this.savedWorkouts.next(ada => ada.) = of(this.convertJsonDataToWorkouts(data));
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
        workouts[position].isImageLoaded = true;
        this.savedWorkouts.next(workouts);
      },
      false);
    if (image) {
      if (image.type !== 'application/pdf') {
        reader.readAsDataURL(image);
      }
    }
  }

  /*
    public set setSavedWorkouts(value: Observable<SavedWorkouts[]>) {
      this.savedWorkouts = value;
    }
  */
  convertJsonDataToWorkouts(inputData) {
    const innerWorkouts: SavedWorkouts[] = [];
    const workoutsAsJson = JSON.parse(JSON.stringify(inputData));

    workoutsAsJson.forEach(x => {
      innerWorkouts.push({
        image: undefined,
        isImageLoaded: false,
        id: x.id,
        name: x.name,
        imageUrl: x.imageUrl,
        userId: x.userId,
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
