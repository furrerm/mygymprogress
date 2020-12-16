import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest, HttpHeaders, HttpEvent, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {ConstantsService} from '../../core/services/constants.service';
@Injectable({
  providedIn: 'root'
})
export class SaveWorkoutService {

  appUrl: string;

  constructor(private http: HttpClient, private constant: ConstantsService) {

    this.appUrl = this.constant.baseAppUrl + 'save-workout-service/upload';
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
/*
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    // var this.http = require('https-proxy-agent');
    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');*/
/*
    const req = new HttpRequest('POST', `${this.appUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
 */

    // return this.http.request(req);

    const httpOptions = {
      // headers: new HttpHeaders({'Content-Type': 'application/json'})
      headers: new HttpHeaders()
    };
    // var this.http = require('https-proxy-agent');
    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');

    const params = new HttpParams().set('UserDTO', JSON.stringify(this.constant.getUser));
    // return this.http.post<string>(this.appUrl, params, httpOptions);
    return this.http.post<HttpEvent<any>>(this.appUrl, formData, httpOptions);
    // return (this.http.get<string>(this.appUrl));
  }
/*
  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
 */
}
