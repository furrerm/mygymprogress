import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CurrentSetServiceService {

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {
  }
  saveSets(exercise: string) {
    console.log(exercise);
    const exerciseParsed = JSON.stringify(JSON.parse(exercise));
    console.log(exerciseParsed);
    // const getSetsUrl = ':8082/save-sets-service/save';
    // const url = 'http://' + this.document.location.hostname + getSetsUrl;
    const getSetsUrl = '/save-sets-service/save';
    const url = 'http://' + 'connectortest-env-1.eba-pjecrepd.eu-west-2.elasticbeanstalk.com' + getSetsUrl;
    console.log('here 1');
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
    };
    // var this.http = require('https-proxy-agent');
    httpOptions.headers.append('Access-Control-Allow-Origin', 'http://localhost:8082');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
    const params = new HttpParams().set('exercise', exerciseParsed);
    return this.http.post<string>(url, params, httpOptions);
  }
}
