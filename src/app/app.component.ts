import {Component, OnInit, ViewChild} from '@angular/core';
import {WelcomeComponent} from './features/welcome/welcome.component';
import {ActivatedRoute, Router} from '@angular/router';
import {CurrentSetComponent} from './features/workout-player/current-set/current-set.component';
import {ConstantsService} from './core/services/constants.service';
import {UserDTO} from './core/model/swagger-model/userDTO';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mygymprogress';

  constructor(private router: Router, private constants: ConstantsService) {
  }

  ngOnInit(): void {
    console.log(this.constants.getUser);
    console.log(this.constants.getUser == null);
    if (this.constants.getUser == null) {
      console.log(window.location + 'welcome');
      console.log('app component init was triggered with username = null');
      // TODO: for login uncomment next line; for developement comment it out
      this.router.navigate(['welcome']);
      const user2: UserDTO = {
        email: '',
        emailVerified: false,
        firstSignIn: false,
        issuer: '',
        name: '',
        pictureUrl: '',
        uid: '',
        id: 50,
        follows: null,
        followers: null
      };
      const user: UserDTO = {
        email: '',
        emailVerified: false,
        firstSignIn: false,
        issuer: '',
        name: '',
        pictureUrl: '',
        uid: '',
        id: 1,
        follows: [user2],
        followers: [user2]
      };
      this.constants.setUser = user;
    }
  }
}
