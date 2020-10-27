import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import {UserInternal} from './UserInternal';
@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  // readonly baseAppUrl: string = 'http://localhost:8082/';
  // readonly baseAppUrl: string = 'http://connectortest-env-1.eba-pjecrepd.eu-west-2.elasticbeanstalk.com/';
  readonly baseAppUrl: string = environment.APIEndpoint;
  private user: UserInternal;
  // readonly baseAppUrl: string = 'http://' + this.document.location.hostname + ':8082/';
  // readonly distLocation: string = 'MyApplication/';

  get getUser(): UserInternal {
    return this.user;
  }

  public set setUser(value: UserInternal) {
    this.user = value;
  }
}


