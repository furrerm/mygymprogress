import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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
    const getSetsUrl = ':8080/myGymProgressConnector/mygymprogress-rest-services/save-sets-service/';
    const url = 'http://' + this.document.location.hostname + getSetsUrl;
    console.log('here 1');
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    // var this.http = require('https-proxy-agent');
    httpOptions.headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
    return this.http.post<string>(url, exercise, httpOptions);
  }
}
