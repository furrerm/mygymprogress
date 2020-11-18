import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';
import {ConstantsService} from '../../../common/services/constants.service';
import {Day} from '../saved-workouts.Workout';

@Injectable({
  providedIn: 'root'
})
export class SaveSetsService {
  readonly distFolderLocation: string;
  constructor(private http: HttpClient,
              @Inject(DOCUMENT) private document: Document,
              private constant: ConstantsService) {
    this.distFolderLocation = constant.baseAppUrl;
  }
  saveSets(exercise: Day, savedWorkoutId: number) {
    const currentWorkout: WorkoutSetDTO = {dayDTO: exercise, userId: this.constant.getUser.id, workoutId: savedWorkoutId};
    const exerciseParsed = JSON.stringify(exercise);
    console.log(exerciseParsed);
    // const getSetsUrl = ':8082/save-sets-service/save';
    // const url = 'http://' + this.document.location.hostname + getSetsUrl;
    const getSetsUrl = 'save-sets-service/save';
    const url = this.distFolderLocation + getSetsUrl;
    console.log('here 1');
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    // var this.http = require('https-proxy-agent');
    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
    console.log(JSON.stringify(exercise));
    return this.http.post<string>(url, currentWorkout, httpOptions);
  }
}
interface WorkoutSetDTO {
  workoutId: number;
  userId: number;
  dayDTO: Day;
}
