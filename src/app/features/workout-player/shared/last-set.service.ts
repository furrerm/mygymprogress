import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ConstantsService} from '../../../core/services/constants.service';
import {ExerciseDTO} from '../../../core/model/swagger-model/exerciseDTO';
import {Observable} from 'rxjs';
import {ImageObservable} from '../../workoutoverview/workoutoverview.component';

@Injectable({
  providedIn: 'root'
})
export class LastSetService {
  constructor(
    private http: HttpClient,
    private constant: ConstantsService) {
  }

  getSets(exerciseIds: number[]): Observable<ExerciseDTO[]> {
    const endpoint = 'exercise-set/get-sets';
    const endpointURL = this.constant.baseAppUrl + endpoint;
    const params = new HttpParams().set('exerciseIds', exerciseIds.toString()).set('userId', String(this.constant.getUser.id));
    return (this.http.get<ExerciseDTO[]>(endpointURL, {params}));
  }

  getVideoTest(constants: ConstantsService, videoUrl: string): Observable<File> {
    const urlLocal = constants.baseAppUrl + 'workoutpreview-service/get-exericse-video';
    const imageBlob: Observable<any> = constants.httpClient
      .get(urlLocal, {params: {
          url: videoUrl,
        }, responseType: 'blob'});
    const result = imageBlob;
    return result;
  }
}
