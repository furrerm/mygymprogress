import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ConstantsService} from '../../common/services/constants.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {

  appUrl: string;
  constructor(private http: HttpClient,
              private constant: ConstantsService) {
    this.appUrl = this.constant.baseAppUrl + 'workout-service/get-workouts';
  }

  fetchWorkouts(): Observable<File> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    // var this.http = require('https-proxy-agent');
    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
    console.log(this.constant.getUser.id.toString());
    console.log(JSON.stringify(this.constant.getUser.id));
    const params = new HttpParams().set('UserDTO', JSON.stringify(this.constant.getUser));
    // return this.http.post<string>(this.appUrl, params, httpOptions);
    const result: Observable<any> = this.http.post<string>(this.appUrl, JSON.stringify(this.constant.getUser), httpOptions);
    return result;
    // return (this.http.get<string>(this.appUrl));
  }

  getFiles(): Observable<File> {
    const httpOptions1 = {
      headers: new HttpHeaders()
    };
    // var this.http = require('https-proxy-agent');
    httpOptions1.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions1.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    httpOptions1.headers.append('Access-Control-Allow-Credentials', 'true');
    const urlLocal = this.constant.baseAppUrl + 'workout-service/get-workout-images';
    const result: Observable<any> = this.http
      .get(urlLocal, { headers: httpOptions1.headers, responseType: 'blob' });
    return result;
  }
}
