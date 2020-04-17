import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LastSetServiceService {

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {
  }
  getSets(exercise: string) {
    const exerciseParsed = JSON.stringify(exercise);
    console.log(exerciseParsed);
    // const getSetsUrl = ':8082/exercise/get-sets';
    // const url = 'http://' + this.document.location.hostname + getSetsUrl;
    const getSetsUrl = '/exercise/get-sets';
    const url = 'http://' + 'connectortest-env-1.eba-pjecrepd.eu-west-2.elasticbeanstalk.com' + getSetsUrl;
    const params = new HttpParams().set('exercise', exerciseParsed);
    return (this.http.get<string>(url, { params }));
  }
}