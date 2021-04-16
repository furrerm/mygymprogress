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
import {DomSanitizer} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {

  appUrl: string;
  private _day: Day;

  constructor(
    private http: HttpClient,
    private constant: ConstantsService,
    private sanitizer: DomSanitizer
  ) {
    this.appUrl = this.constant.baseAppUrl;
  }

  fetchWorkoutsWithSearchCriteria(constants: ConstantsService, filters: Array<string>, pageSize: number, offsetId: number): Observable<WorkoutDTO[]> {
    const endpointUrl = constants.baseAppUrl + 'workout-service/get-workouts-with-search-criteria';
    const criteria = filters;
    let params = new HttpParams().set('userDTOAsJson', JSON.stringify(constants.getUser));
    params = params.append('criteria', JSON.stringify(criteria));
    params = params.append('pageSize', String(pageSize));
    params = params.append('offsetId', String(offsetId));

    const result: Observable<WorkoutDTO[]> = constants.httpClient.post<WorkoutDTO[]>(endpointUrl, params);
    return result;
  }

  public initializeWorkouts(
    savedWorkouts: BehaviorSubject<Workout[]>,
    workoutFetcher: (endpointEssentials: ConstantsService, filters: Array<string>, pageSize: number, offsetId: number) => Observable<WorkoutDTO[]>,
    filters: Array<string>,
    pageSize: number,
    offsetId: number
  ): void {
    let workoutsLocal: Workout[] = [];
    workoutFetcher(this.constant, filters, pageSize, offsetId).subscribe((data: WorkoutDTO[]) => {
      workoutsLocal = new WorkoutConverter(this.sanitizer).convertDTOsToWorkouts(data);
      // workoutsLocal = workoutsLocal.sort((a, b) => a.id - b.id);
      savedWorkouts.next(workoutsLocal);
    });
  }

  get day(): Day {
    return this._day;
  }
}
