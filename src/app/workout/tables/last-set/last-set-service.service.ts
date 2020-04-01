import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LastSetServiceService {

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {
  }
  getSets(exercise: string) {
    const exerciseParsed = JSON.stringify(exercise);
    console.log(exerciseParsed)
    const getSetsUrl = ':8080/myGymProgressConnector/mygymprogress-rest-services/exercise-service/get-sets/';
    const url = 'http://' + this.document.location.hostname + getSetsUrl + exerciseParsed;
    return (this.http.get<string>(url));
  }
}
