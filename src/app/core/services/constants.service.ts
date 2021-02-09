import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import {UserDTO} from '../model/swagger-model/userDTO';
@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  readonly baseAppUrl: string = environment.APIEndpoint;
  private user: UserDTO;

  get getUser(): UserDTO {
    return this.user;
  }

  public set setUser(value: UserDTO) {
    this.user = value;
  }
}


