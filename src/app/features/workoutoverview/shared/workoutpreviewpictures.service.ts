import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ConstantsService} from '../../../core/services/constants.service';
import {ImageObservable} from '../workoutoverview.component';

@Injectable({
  providedIn: 'root'
})
export class WorkoutpreviewpicturesService {
  appUrl: string;

  constructor(private http: HttpClient,
              private constant: ConstantsService) {
    this.appUrl = this.constant.baseAppUrl + 'workoutpreview-service/get-workoutpreview-images';
  }

  getUrls(): Observable<any> {
    const httpOptions1 = {
      headers: new HttpHeaders()
    };
    // var this.http = require('https-proxy-agent');
    httpOptions1.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions1.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    httpOptions1.headers.append('Access-Control-Allow-Credentials', 'true');
    const urlLocal = this.constant.baseAppUrl + 'workoutpreview-service/get-workoutpreview-images-urls';

    const userIdParam = new HttpParams().set('userIdFromFrontend', this.constant.getUser.id.toString());
    const result: Observable<any> = this.http
      .get(urlLocal, {params: userIdParam, headers: httpOptions1.headers, responseType: 'json'});
    return result;

  }

  getFiles(imagePosition, url1: string): ImageObservable {
    const httpOptions1 = {
      headers: new HttpHeaders()
    };
    // var this.http = require('https-proxy-agent');
    httpOptions1.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions1.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    httpOptions1.headers.append('Access-Control-Allow-Credentials', 'true');
    const urlLocal = this.constant.baseAppUrl + 'workoutpreview-service/get-workoutpreview-images';

    const userIdParam = new HttpParams().set('userIdFromFrontend', this.constant.getUser.id.toString());
    console.log('url = ' + url1);
    const imageBlob: Observable<any> = this.http
      .get(urlLocal, {params: {
          url: url1,
        }, headers: httpOptions1.headers, responseType: 'blob'});
    const result: ImageObservable = {image: imageBlob, position: imagePosition};
    return result;
  }

}
