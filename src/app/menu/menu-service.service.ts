import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {
  appUrl: string;
  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {
    // const getJsonRoutines = ':8082/routine-service/get-json-routines';
    // this.appUrl = 'http://' + this.document.location.hostname + getJsonRoutines;
    const getJsonRoutines = ':8080/routine-service/get-json-routines';
    this.appUrl = 'http://' + 'Connectortest-env-1.eba-pjecrepd.eu-west-2.elasticbeanstalk.com (e-gc29nzqr6e)' + getJsonRoutines;
  }

  fetchExerciseGroups() {
    return (this.http.get<string>(this.appUrl));
  }
}
