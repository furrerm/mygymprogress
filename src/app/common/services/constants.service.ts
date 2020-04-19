import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  readonly baseAppUrl: string = 'http://localhost:8082/';
  // readonly baseAppUrl: string = 'http://connectortest-env-1.eba-pjecrepd.eu-west-2.elasticbeanstalk.com/';
  // readonly baseAppUrl: string = 'http://' + this.document.location.hostname + ':8082/';
  // readonly distLocation: string = 'MyApplication/';
}
