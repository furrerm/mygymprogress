import {Component, OnInit, ViewChild} from '@angular/core';
import {WelcomeComponent} from './welcome/welcome.component';
import {ActivatedRoute, Router} from '@angular/router';
import {CurrentSetComponent} from './workoutoverview/workout/tables/current-set/current-set.component';
import {ConstantsService} from './common/services/constants.service';

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
      // very important include next line again for sign in
      // this.router.navigate(['welcome']);
      // window.location.href = window.location + 'welcome';
    }
  }
}
