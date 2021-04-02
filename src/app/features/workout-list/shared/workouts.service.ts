import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ConstantsService} from '../../../core/services/constants.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {WorkoutDTO} from '../../../core/model/swagger-model/workoutDTO';
import {ExerciseDTO} from '../../../core/model/swagger-model/exerciseDTO';
import {SavedWorkoutDTO} from '../../../core/model/swagger-model/savedWorkoutDTO';
import {Workout} from '../../../core/model/internal-model/workout.model';
import {WorkoutConverter} from '../../../core/model/converter/workout-converter';
import {ImageObservable} from '../../workoutoverview/workoutoverview.component';
import {createObjectSnapshotChanges} from '@angular/fire/database/object/snapshot-changes';
import {DayDTO} from '../../../core/model/swagger-model/dayDTO';
import {Day} from '../../../core/model/internal-model/day.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {

  appUrl: string;
  private _day: Day;

  constructor(
    private http: HttpClient,
    private constant: ConstantsService) {
    this.appUrl = this.constant.baseAppUrl;
  }

  fetchWorkouts(constants: ConstantsService): Observable<WorkoutDTO[]> {
    const endpointUrl = constants.baseAppUrl + 'workout-service/get-workouts';
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    const result: Observable<WorkoutDTO[]> = constants.httpClient.post<WorkoutDTO[]>(endpointUrl, JSON.stringify(constants.getUser), httpOptions);
    return result;
  }

  fetchWorkoutsWithSearchCriteria(constants: ConstantsService): Observable<WorkoutDTO[]> {
    const endpointUrl = constants.baseAppUrl + 'workout-service/get-workouts-with-search-criteria';
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    const result: Observable<WorkoutDTO[]> = constants.httpClient.post<WorkoutDTO[]>(endpointUrl, JSON.stringify(constants.getUser), httpOptions);
    return result;
  }

  likeWorkout(savedWorkout: SavedWorkoutDTO): Observable<string> {
    const httpOptions1 = {
      headers: new HttpHeaders()
    };
    httpOptions1.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions1.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions1.headers.append('Access-Control-Allow-Credentials', 'true');
    const urlLocal = this.constant.baseAppUrl + 'like-service/like-workout';
    return (this.http.post<string>(urlLocal, savedWorkout));
  }

  public initializeWorkouts(
    savedWorkouts: BehaviorSubject<Workout[]>,
    workoutFetcher: (endpointEssentials: ConstantsService) => Observable<WorkoutDTO[]>,
    imageAdder: (imagePosition: number, url1: string, constants: ConstantsService) => ImageObservable
  ): void {
    let workoutsLocal: Workout[] = [];
    workoutFetcher(this.constant).subscribe((data: WorkoutDTO[]) => {
      workoutsLocal = new WorkoutConverter().convertDTOsToWorkouts(data);
      workoutsLocal = workoutsLocal.sort((a, b) => a.id - b.id);
      savedWorkouts.next(workoutsLocal);
      /*
      for (const i in workoutsLocal) {
        if (data.hasOwnProperty(i)) {
          imageAdder(Number(i), workoutsLocal[i].imageUrl, this.constant).image.subscribe(data2 => {
            this.addImagesToWorkouts(data2, workoutsLocal[i]);
          });
        }
      }

       */
    });
  }
/*
  private addImagesToWorkouts(image: Blob, workout): void {
    const reader = new FileReader();
    reader.addEventListener('load',
      () => {
        workout.image = reader.result;
      },
      false);
    if (image) {
      if (image.type !== 'application/pdf') {
        reader.readAsDataURL(image);
      }
    }
  }
*/
  cacheWorkoutDayToPlay(day: Day): void {
    this._day = day;
  }

  get day(): Day {
    return this._day;
  }
}
