import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ConstantsService} from '../../../common/services/constants.service';
import {ExerciseDTO} from '../../../common/model/swagger-model/exerciseDTO';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LastSetService {
  constructor(private http: HttpClient,
              private constant: ConstantsService) {
  }

  getSets(exerciseIds: number[]): Observable<ExerciseDTO[]> {
    const endpoint = 'exercise/get-sets';
    const endpointURL = this.constant.baseAppUrl + endpoint;
    const params = new HttpParams().set('exerciseIds', exerciseIds.toString());
    return (this.http.get<ExerciseDTO[]>(endpointURL, { params }));
  }
}
