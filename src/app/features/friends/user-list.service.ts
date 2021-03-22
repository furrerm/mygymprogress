import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserDTO} from '../../core/model/swagger-model/userDTO';
import {ConstantsService} from '../../core/services/constants.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor(
    private constants: ConstantsService,
    private http: HttpClient) {
  }

  getAllUsers(): Observable<UserDTO[]> {
    const url = this.constants.baseAppUrl + 'login-service/all-users';
    const allUsers: Observable<UserDTO[]> = this.http.get<UserDTO[]>(url);
    return allUsers;
  }

  follow(follows: number, userId: number, unFollow: boolean): Observable<string> {

    const httpOptions = {
      headers: new HttpHeaders()
    };
    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');

    const url = this.constants.baseAppUrl + 'login-service/follow';
    let followParams = new HttpParams().set('userId', String(userId));
    followParams = followParams.append('followsId', String(follows));
    followParams = followParams.append('unFollow', String(unFollow));

    const result: Observable<string> = this.http.post<string>(url, followParams, httpOptions);
    return result;
  }
}

