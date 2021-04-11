import {Injectable} from '@angular/core';
import {SimplePostDTO} from '../../../core/model/swagger-model/simplePostDTO';
import {Observable} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';
import {UserDTO} from 'src/app/core/model/swagger-model/userDTO';
import {ConstantsService} from '../../../core/services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class SaveProfileDataService {

  constructor(private constants: ConstantsService) {
  }

  uploadProfile(userDTO: UserDTO): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders()
    };
    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
    const saveWorkoutEndpoint = this.constants.baseAppUrl + 'login-service/upload-profile';

    return this.constants.httpClient.post<string>(saveWorkoutEndpoint, userDTO, httpOptions);
  }
}
