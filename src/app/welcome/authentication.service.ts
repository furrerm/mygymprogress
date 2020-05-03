import {Inject, Injectable, NgZone, OnInit} from '@angular/core';
import { auth } from 'firebase/app';
import { User } from './user';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {idTokenResult} from '@angular/fire/auth-guard';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';
import {ConstantsService} from '../common/services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  readonly distFolderLocation: string;
  private token: string;
  /*
  constructor(private http: HttpClient,
              @Inject(DOCUMENT) private document: Document,
              private constant: ConstantsService) {
    this.distFolderLocation = constant.baseAppUrl;
  }
*/
  constructor(
    private http: HttpClient,
    private constant: ConstantsService,
    public router: Router,
    public ngZone: NgZone,
    public afAuth: AngularFireAuth,
    private angularFireAuth: AngularFireAuth
  ) {
  this.distFolderLocation = constant.baseAppUrl;
  }
  OAuthProvider(provider) {
    return this.afAuth.signInWithPopup(provider)
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

    return this.OAuthProvider(new auth.GoogleAuthProvider())
      .then((res) => {

      }).catch(error => {
        console.log(error);
      });
  }
  SignOut() {
    return this.afAuth.signOut().then(() => {
      console.log('logged out');
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
