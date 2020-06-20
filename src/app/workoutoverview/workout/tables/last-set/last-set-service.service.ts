import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';
import { ConstantsService } from '../../../../common/services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class LastSetServiceService {
  readonly distFolderLocation: string;
  constructor(private http: HttpClient,
              @Inject(DOCUMENT) private document: Document,
              private constant: ConstantsService) {
    this.distFolderLocation = constant.baseAppUrl;
  }
  getSets(exercise: string) {
    const exerciseParsed = JSON.stringify(exercise);
    console.log(exerciseParsed);
    // const getSetsUrl = ':8082/exercise/get-sets';
    // const url = 'http://' + this.document.location.hostname + getSetsUrl;
    const getSetsUrl = 'exercise/get-sets';
    const url = this.distFolderLocation + getSetsUrl;
    const params = new HttpParams().set('exercise', exerciseParsed);
    return (this.http.get<string>(url, { params }));
  }
}
