import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';
import { ConstantsService } from '../common/services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {
  appUrl: string;
  readonly distFolderLocation: string;
  constructor(private http: HttpClient,
              @Inject(DOCUMENT) private document: Document,
              private constant: ConstantsService) {
    // const getJsonRoutines = ':8082/routine-service/get-json-routines';
    // this.appUrl = 'http://' + this.document.location.hostname + getJsonRoutines;
    this.distFolderLocation = constant.baseAppUrl;
    // const u = 'http://connectortest-env-1.eba-pjecrepd.eu-west-2.elasticbeanstalk.com/routine-service/get-json-routines';
    const u = this.distFolderLocation + 'routine-service/get-json-routines';
    this.appUrl = u;
  }

  fetchExerciseGroups() {
    return (this.http.get<string>(this.appUrl));
  }
}
