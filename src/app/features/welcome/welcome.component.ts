import {Component, ElementRef, Injectable, OnInit, ViewChild, NgZone} from '@angular/core';
import {AuthenticationService} from '../../core/services/authentication.service';
import {User} from '../../core/model/internal-model/user';
import {Router} from '@angular/router';
import {ConstantsService} from '../../core/services/constants.service';
import {UserDTO} from '../../core/model/swagger-model/userDTO';

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

  GetToken(): string {
    this._authService.afAuth.onAuthStateChanged(user => {
        if (user) {
          user.getIdToken().then(idToken => {
            this.idToken = idToken;
            // this shows the userToken
            console.log('token inside getToken method ' + this.idToken);
            this._authService.validateLogin(this.idToken).subscribe((userDTO: UserDTO) => {
                this.constants.setUser = userDTO;
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
