import { Injectable } from '@angular/core';
import {SavedWorkoutDTO} from '../../core/model/swagger-model/savedWorkoutDTO';
import {Observable} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';
import {ConstantsService} from '../../core/services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private constants: ConstantsService) { }

  likeWorkout(savedWorkout: SavedWorkoutDTO): Observable<string> {
    const httpOptions1 = {
      headers: new HttpHeaders()
    };
    httpOptions1.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions1.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions1.headers.append('Access-Control-Allow-Credentials', 'true');
    const urlLocal = this.constants.baseAppUrl + 'like-service/like-workout';
    return (this.constants.httpClient.post<string>(urlLocal, savedWorkout));
  }
}
