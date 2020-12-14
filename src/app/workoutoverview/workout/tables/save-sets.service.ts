import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';
import {ConstantsService} from '../../../common/services/constants.service';
import {DayDTO} from '../../../common/model/swagger-model/dayDTO';
import {WorkoutSetDTO} from '../../../common/model/swagger-model/workoutSetDTO';

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
  saveSets(exercise: DayDTO, savedWorkoutId: number) {
    const currentWorkout: WorkoutSetDTO = {dayDTO: exercise, userId: this.constant.getUser.id, workoutId: savedWorkoutId};
    const endpoint = 'save-sets-service/save';
    const endpointURL = this.constant.baseAppUrl + endpoint;
    return this.http.post<string>(endpointURL, currentWorkout);
  }
}
