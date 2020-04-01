import {Inject, Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';

import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {
  appUrl: string;
  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {
    const getJsonRoutines = ':8080/myGymProgressConnector/mygymprogress-rest-services/routine-service/get-json-routines';
    this.appUrl = 'http://' + this.document.location.hostname + getJsonRoutines;
  }

  fetchExerciseGroups() {
    return (this.http.get<string>(this.appUrl));
  }
}
