import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {SimplePostDTO} from '../../../core/model/swagger-model/simplePostDTO';
import {ConstantsService} from '../../../core/services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class SaveSimplePostService {

  constructor(
    private constant: ConstantsService,
    private http: HttpClient) {
  }

  uploadSimpleWorkout(simplePostDTO: SimplePostDTO): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders()
    };
    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
    const saveWorkoutEndpoint = this.constant.baseAppUrl + 'posts-service/upload-simple-post';

    return this.http.post<string>(saveWorkoutEndpoint, simplePostDTO, httpOptions);
  }
}
