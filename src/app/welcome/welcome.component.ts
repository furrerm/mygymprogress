import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import { User } from './user';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {
  @ViewChild('loginRef', {static: true}) loginElement: ElementRef;
  auth2: any;
  user: User;
  idToken: string;

  constructor(private _authService: AuthenticationService) {
  }

  ngOnInit() {
    this._authService.afAuth.authState.subscribe(user => {
      this.user = user;
    });
    this.GetToken();
  }
  foo() {
    console.log(this.user.displayName);
    console.log(this.user.email);
    console.log(this.user.uid);
    console.log(this.user.photoURL);
    console.log(this.user);
  }
  GetToken(): string {
    this._authService.afAuth.onAuthStateChanged(user => {
      if (user) {
        user.getIdToken().then(idToken => {
          this.idToken = idToken;
          // this shows the userToken
          console.log('token inside getToken method ' + this.idToken);
          this._authService.validateLogin(this.idToken).subscribe(a => {
          });
        });
      }
    });
    console.log('before return ' + this.idToken);
    return this.idToken;
  }

  get authService(): AuthenticationService {
    return this._authService;
  }
}
