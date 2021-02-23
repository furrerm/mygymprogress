import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ConstantsService} from '../../../../../core/services/constants.service';
import {ExerciseDTO} from '../../../../../core/model/swagger-model/exerciseDTO';

@Injectable({
  providedIn: 'root'
})
export class AllExercisesService {
private getExercisesURL;
  constructor(
    private http: HttpClient,
    private constant: ConstantsService) {
    this.getExercisesURL = this.constant.baseAppUrl + 'exercise/get-all-exercises';
  }

  getAllExercises(): Observable<ExerciseDTO[]> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
    const result: Observable<ExerciseDTO[]> = this.http.post<ExerciseDTO[]>(this.getExercisesURL, null, httpOptions);
    return result;
  }
}
