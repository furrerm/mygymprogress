import { Injectable } from '@angular/core';
import {ConstantsService} from './constants.service';
import {Observable} from 'rxjs';
import {WorkoutDTO} from '../model/swagger-model/workoutDTO';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SavedWorkoutsService {

  constructor(private constants: ConstantsService) { }

  fetchWorkouts(): Observable<WorkoutDTO[]> {
    const endpointUrl = this.constants.baseAppUrl + 'workout-service/get-workouts';
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    const result: Observable<WorkoutDTO[]> = this.constants.httpClient.post<WorkoutDTO[]>(endpointUrl, JSON.stringify(this.constants.getUser), httpOptions);
    return result;
  }
}
