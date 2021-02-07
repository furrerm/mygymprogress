import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpEvent, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {ConstantsService} from '../../../core/services/constants.service';
@Injectable({
  providedIn: 'root'
})
export class SaveWorkoutService {

  appUrl: string;
  constructor(private http: HttpClient, private constant: ConstantsService) {
    this.appUrl = this.constant.baseAppUrl + 'save-workout-service/upload';
  }

  upload(file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const httpOptions = {
      headers: new HttpHeaders()
    };
    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');

    const params = new HttpParams().set('UserDTO', JSON.stringify(this.constant.getUser));
    return this.http.post<string>(this.appUrl, formData, httpOptions);
  }
}
