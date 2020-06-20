import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ConstantsService} from '../../common/services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {

  appUrl: string;
  constructor(private http: HttpClient,
              private constant: ConstantsService) {
    this.appUrl = this.constant.baseAppUrl + 'workout-service/get-workouts';
  }

  fetchWorkouts() {
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
    return this.http.post<string>(this.appUrl, JSON.stringify(this.constant.getUser), httpOptions);
    // return (this.http.get<string>(this.appUrl));
  }
}
