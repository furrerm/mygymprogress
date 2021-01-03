import {Injectable, NgZone} from '@angular/core';
import {auth} from 'firebase/app';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ConstantsService} from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  readonly distFolderLocation: string;
  private token: string;

  constructor(
    private http: HttpClient,
    private constant: ConstantsService,
    public router: Router,
    public ngZone: NgZone,
    public afAuth: AngularFireAuth
  ) {
    this.distFolderLocation = constant.baseAppUrl;
  }

  OAuthProvider(provider) {
    return this.afAuth.signInWithRedirect(provider)
      .then((res) => {
        this.ngZone.run(() => {
          // this.router.navigate(['dashboard']);
          this.token = provider.getAuthToken;
          // provider.getAuthToken();
        });
      }).catch((error) => {
        window.alert(error);
      });
  }

  SigninWithGoogle() {
    console.log(new auth.GoogleAuthProvider());
    return this.OAuthProvider(new auth.GoogleAuthProvider())
      .then((res) => {

      }).catch(error => {
        console.log(error);
      });
  }

  SignOut(user: any) {
    return this.afAuth.signOut().then(() => {
      console.log('logged out');
      // this.router.navigate(['welcome']);
      user = null;
      window.location.reload();
      // this.router.navigate(['welcome']);
    });
  }

  validateLogin(exercise: string) {
    console.log(exercise);
    const getSetsUrl = 'login-service/validate';
    const url = this.distFolderLocation + getSetsUrl;

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
    };

    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
    console.log(exercise);
    const exerciseParsed = JSON.stringify(JSON.parse('{"tokenid":"' + exercise + '"}'));
    const params = new HttpParams().set('tokenid', exerciseParsed);
    return this.http.post<string>(url, params, httpOptions);
    /*
    return this.http.post(this.urlEnvironment.jiraGetIssue(), body, {headers: headers});
    // return this.http.post(this.urlEnvironment.jiraGetIssue(), null, {headers: this.getHeaders(), params: params});
     */
  }
}
