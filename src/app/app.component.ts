import {Component, OnInit, ViewChild} from '@angular/core';
import {WelcomeComponent} from './welcome/welcome.component';
import {ActivatedRoute, Router} from '@angular/router';
import {CurrentSetComponent} from './workoutoverview/workout/tables/current-set/current-set.component';
import {ConstantsService} from './common/services/constants.service';
import {UserInternal} from './common/services/UserInternal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mygymprogress';

  constructor(private router: Router, private constants: ConstantsService) {
  }

  ngOnInit() {
    console.log(this.constants.getUser);
    console.log(this.constants.getUser == null);
    if (this.constants.getUser == null) {
      console.log(window.location + 'welcome');
      console.log('app component init was triggered with username = null');
      // TODO: for login uncomment next line; for developement comment it out
      this.router.navigate(['welcome']);
      /*
      const user: UserInternal = {
        email: '',
        emailVerified: false,
        firstSignIn: false,
        issuer: '',
        name: '',
        pictureUrl: '',
        uid: '',
        id: 1
      };
      this.constants.setUser = user;
       */
    }
  }
}
