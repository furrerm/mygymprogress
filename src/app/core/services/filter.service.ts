import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';
import {FilterGroupDTO} from '../model/swagger-model/filterGroupDTO';
import {ConstantsService} from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private constant: ConstantsService) {

  }

  getAllExerciseFilterGroups(): Observable<FilterGroupDTO[]> {
    const url = this.constant.baseAppUrl + 'filter/get-all-filter-groups';
    const result: Observable<FilterGroupDTO[]> = this.constant.httpClient.get<FilterGroupDTO[]>(url);
    return result;
  }

  getAllInterestFilterGroups(): Observable<FilterGroupDTO[]> {
    // todo: impl
    return null;
  }

  getAllWorkoutFilterGroups(): Observable<FilterGroupDTO[]> {
    const url = this.constant.baseAppUrl + 'filter/get-workout-filter-groups';
    const result: Observable<FilterGroupDTO[]> = this.constant.httpClient.get<FilterGroupDTO[]>(url);
    return result;
  }
}
