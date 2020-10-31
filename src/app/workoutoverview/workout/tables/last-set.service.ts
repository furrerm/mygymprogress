import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ConstantsService} from '../../../common/services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class LastSetService {
  readonly distFolderLocation: string;
  constructor(private http: HttpClient,
              private constant: ConstantsService) {
    this.distFolderLocation = constant.baseAppUrl;
  }

  getSets(exerciseIds: number[], dayId: number) {
    const getSetsUrl = 'exercise/get-sets';
    const url = this.distFolderLocation + getSetsUrl;
    const params = new HttpParams().set('exerciseIds', exerciseIds.toString()).set('dayId', dayId.toString());
    return (this.http.get<string>(url, { params }));
  }
}
