import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';
import {ConstantsService} from '../../../core/services/constants.service';
import {DayDTO} from '../../../core/model/swagger-model/dayDTO';
import {WorkoutSetDTO} from '../../../core/model/swagger-model/workoutSetDTO';
import {Observable} from 'rxjs';

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
  saveSets(dayDTO: DayDTO, savedWorkoutId: number): Observable<string> {
    const currentWorkout: WorkoutSetDTO = {dayDTO, userId: this.constant.getUser.id, workoutId: savedWorkoutId};
    const endpoint = 'save-sets-service/save';
    const endpointURL = this.constant.baseAppUrl + endpoint;
    return this.http.post<string>(endpointURL, currentWorkout);
  }
}
