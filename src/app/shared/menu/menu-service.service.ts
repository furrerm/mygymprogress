import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ConstantsService } from '../../core/services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {
  appUrl: string;
  readonly distFolderLocation: string;
  constructor(private http: HttpClient,
              private constant: ConstantsService) {

    this.distFolderLocation = constant.baseAppUrl;
    const u = this.distFolderLocation + 'routine-service/get-json-routines';
    this.appUrl = u;
  }

  fetchExerciseGroups() {
    return (this.http.get<string>(this.appUrl));
  }
}
