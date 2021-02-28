import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import {UserDTO} from '../model/swagger-model/userDTO';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  constructor(private _httpClient: HttpClient) {

  }
  private readonly _baseAppUrl: string = environment.APIEndpoint;
  private user: UserDTO;

  get getUser(): UserDTO {
    return this.user;
  }

  public set setUser(value: UserDTO) {
    this.user = value;
  }

  get httpClient(): HttpClient {
    return this._httpClient;
  }

  get baseAppUrl(): string {
    return this._baseAppUrl;
  }
}


