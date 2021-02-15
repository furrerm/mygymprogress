import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ConstantsService} from '../../../core/services/constants.service';
import {Observable} from 'rxjs';
import {WorkoutDTO} from '../../../core/model/swagger-model/workoutDTO';
import {ExerciseDTO} from '../../../core/model/swagger-model/exerciseDTO';
import {SavedWorkoutDTO} from '../../../core/model/swagger-model/savedWorkoutDTO';

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {

  appUrl: string;
  constructor(private http: HttpClient,
              private constant: ConstantsService) {
    this.appUrl = this.constant.baseAppUrl;
  }

  fetchWorkouts(): Observable<WorkoutDTO[]> {
    const endpointUrl = this.appUrl + 'workout-service/get-workouts';
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
    const result: Observable<WorkoutDTO[]> = this.http.post<WorkoutDTO[]>(endpointUrl, JSON.stringify(this.constant.getUser), httpOptions);
    return result;
  }

  fetchWorkoutsWithSearchCriteria(): Observable<WorkoutDTO[]> {
    const endpointUrl = this.appUrl + 'workout-service/get-workouts-with-search-criteria';
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');

    const result: Observable<WorkoutDTO[]> = this.http.post<WorkoutDTO[]>(endpointUrl, JSON.stringify(this.constant.getUser), httpOptions);
    return result;
  }

  getFiles(): Observable<File> {
    const httpOptions1 = {
      headers: new HttpHeaders()
    };
    httpOptions1.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions1.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions1.headers.append('Access-Control-Allow-Credentials', 'true');
    const urlLocal = this.constant.baseAppUrl + 'workout-service/get-workout-images';
    const result: Observable<any> = this.http
      .get(urlLocal, { headers: httpOptions1.headers, responseType: 'blob' });
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
}
