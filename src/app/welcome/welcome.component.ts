import {Component, ElementRef, Injectable, OnInit, ViewChild, NgZone} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {User} from './user';
import {Router} from '@angular/router';
import {ConstantsService} from '../common/services/constants.service';
import {UserInternal} from '../common/services/UserInternal';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class WelcomeComponent implements OnInit {
  @ViewChild('loginRef', {static: true}) loginElement: ElementRef;
  auth2: any;
  user: User;
  idToken: string;
  private sub: any;

  constructor(private _authService: AuthenticationService,
              private router: Router,
              private constants: ConstantsService,
              private ngZone: NgZone) {
  }

  ngOnInit() {
    this.sub = this._authService.afAuth.authState.subscribe(user => {
      this.user = user;
    });
    this.GetToken();
  }

  foo() {
    console.log(this.user);
    console.log(this.user.displayName);
    console.log(this.user.email);
    console.log(this.user.uid);
    console.log(this.user.photoURL);
    console.log(this.user);
    console.log(document.cookie);
  }

  GetToken(): string {
    this._authService.afAuth.onAuthStateChanged(user => {
        if (user) {
          user.getIdToken().then(idToken => {
            this.idToken = idToken;
            // this shows the userToken
            console.log('token inside getToken method ' + this.idToken);
            this._authService.validateLogin(this.idToken).subscribe(a => {
                console.log(a);
                const b: UserInternal = JSON.parse(JSON.stringify(a));
                this.constants.setUser = b;
                this.ngZone.run(() => {
                  if (this.constants.getUser !== undefined) {
                    this.router.navigate(['workoutoverview']);
                  }
                });
              }
            );
          });
        }
      }
    );
    console.log('before return ' + this.idToken);
    return this.idToken;
  }

  get authService(): AuthenticationService {
  return this._authService;
  }
}
