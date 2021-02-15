import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpEvent, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {ConstantsService} from '../../../core/services/constants.service';
import {WorkoutDTO} from '../../../core/model/swagger-model/workoutDTO';
@Injectable({
  providedIn: 'root'
})
export class SaveWorkoutService {

  appUrl: string;
  private _workout: WorkoutDTO;
  private _file: File;
  constructor(
    private http: HttpClient,
    private constant: ConstantsService
  ) {
    this.appUrl = this.constant.baseAppUrl + 'save-workout-service/upload';
  }

  get file(): File {
    return this._file;
  }

  cacheFile(file: File): void {
    this._file = file;
  }

  cacheWorkout(workout: WorkoutDTO): void {
    this._workout = workout;
  }

  get workout(): WorkoutDTO {
    return this._workout;
  }

  uploadWorkout(): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders()
    };
    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
    const saveWorkoutEndpoint = this.constant.baseAppUrl + 'save-workout-service/upload-workout';
    return this.http.post<string>(saveWorkoutEndpoint, this.workout, httpOptions);
  }

  uploadFile(path: string): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', this._file);
    formData.append('path', path);
    const httpOptions = {
      headers: new HttpHeaders()
    };
    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');

    const params = new HttpParams().set('UserDTO', JSON.stringify(this.constant.getUser));
    return this.http.post<string>(this.appUrl, formData, httpOptions);
  }
}
