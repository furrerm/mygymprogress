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

  getAllFilterGroups(): Observable<FilterGroupDTO[]> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    const url = this.constant.baseAppUrl + 'filter/get-all-filter-groups';
    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
    const result: Observable<FilterGroupDTO[]> = this.constant.httpClient.get<FilterGroupDTO[]>(url);
    return result;
  }
}
