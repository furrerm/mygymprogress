import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ConstantsService} from '../../../core/services/constants.service';
import {ImageObservable} from '../workoutoverview.component';

@Injectable({
  providedIn: 'root'
})
export class WorkoutOverviewPicturesService {
  appUrl: string;

  constructor(private http: HttpClient,
              private constant: ConstantsService) {
    this.appUrl = this.constant.baseAppUrl + 'workoutpreview-service/get-workoutpreview-images';
  }

  getUrls(): Observable<string[]> {
    const urlLocal = this.constant.baseAppUrl + 'workoutpreview-service/get-workoutpreview-images-urls';

    const userIdParam = new HttpParams().set('userIdFromFrontend', this.constant.getUser.id.toString());
    const result: Observable<any> = this.http
      .get(urlLocal, {params: userIdParam, responseType: 'json'});
    return result;

  }

  getFiles(imagePosition: number, url1: string, constants: ConstantsService): ImageObservable {

    const urlLocal = constants.baseAppUrl + 'workoutpreview-service/get-workoutpreview-images';
    const imageBlob: Observable<any> = constants.httpClient
      .get(urlLocal, {params: {
          url: url1,
        }, responseType: 'blob'});
    const result: ImageObservable = {image: imageBlob, position: imagePosition};
    return result;
  }

}
