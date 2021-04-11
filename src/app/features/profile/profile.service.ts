import { Injectable } from '@angular/core';
import {ConstantsService} from '../../core/services/constants.service';
import {HttpParams} from '@angular/common/http';
import {PageDTO} from '../../core/model/swagger-model/pageDTO';
import {UserDTO} from '../../core/model/swagger-model/userDTO';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private constants: ConstantsService) { }

  public loadMyProfile(): Observable<UserDTO> {
    const endpoint = 'login-service/get-userprofile-image';
    const endpointURL = this.constants.baseAppUrl + endpoint;
    const params = new HttpParams().set('userId', JSON.stringify(this.constants.getUser.id));

    return this.constants.httpClient.get<UserDTO>(endpointURL, {params});
  }
}
