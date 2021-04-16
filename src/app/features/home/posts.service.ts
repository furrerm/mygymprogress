import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ExerciseDTO} from '../../core/model/swagger-model/exerciseDTO';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ConstantsService} from '../../core/services/constants.service';
import {PageDTO} from '../../core/model/swagger-model/pageDTO';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private httpClient: HttpClient,
    private constants: ConstantsService) {
  }

  getPosts(id: number): Observable<PageDTO> {

    const endpoint = 'posts-service/get-all-posts';
    const endpointURL = this.constants.baseAppUrl + endpoint;
    let params = new HttpParams().set('userDTO', JSON.stringify(this.constants.getUser));
    params = params.append('lastId', String(id));

    return this.httpClient.get<PageDTO>(endpointURL, {params});
  }
}
