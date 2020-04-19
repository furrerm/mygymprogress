import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';
import { ConstantsService } from '../../../common/services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentSetServiceService {
  readonly distFolderLocation: string;
  constructor(private http: HttpClient,
              @Inject(DOCUMENT) private document: Document,
              private constant: ConstantsService) {
    this.distFolderLocation = constant.baseAppUrl;
  }
  saveSets(exercise: string) {
    console.log(exercise);
    const exerciseParsed = JSON.stringify(JSON.parse(exercise));
    console.log(exerciseParsed);
    // const getSetsUrl = ':8082/save-sets-service/save';
    // const url = 'http://' + this.document.location.hostname + getSetsUrl;
    const getSetsUrl = 'save-sets-service/save';
    const url = this.distFolderLocation + getSetsUrl;
    console.log('here 1');
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
    };
    // var this.http = require('https-proxy-agent');
    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
    const params = new HttpParams().set('exercise', exerciseParsed);
    return this.http.post<string>(url, params, httpOptions);
  }
}
