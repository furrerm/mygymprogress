import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {MenuServiceService} from './menu-service.service';
import {printLine} from 'tslint/lib/verify/lines';
import {LastSetServiceService} from '../workoutoverview/workout/tables/last-set/last-set-service.service';
import {NavigationEnd, Router} from '@angular/router';
import {ConstantsService} from '../common/services/constants.service';
import {WelcomeComponent} from '../welcome/welcome.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  opened: boolean;
  status: boolean;
  title = 'CRS';
  exerciseGroups: ExerciseGroup[];
  workoutGroups: string;
  exercises: string;
  group: string;
  mySubscription;
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
  private distFolderLocation: string;

  constructor(private menuServiceService: MenuServiceService,
              private lastSetService: LastSetServiceService,
              private router: Router,
              private constant: ConstantsService,
              private welcomeComponent: WelcomeComponent,
              private constants: ConstantsService) {
    this.opened = false;
    this.workoutGroups = 'hiddenWorkouts';
    this.exercises = 'hiddenExercises';
    this.distFolderLocation = constant.baseAppUrl;
  }

  ngOnInit() {
  }

  logout() {
    console.log('logout');
    this.welcomeComponent.authService.SignOut(this.welcomeComponent.user);
  }

  openCloseSideNavigation() {
    this.opened = !this.opened;
  }
}

interface ExerciseGroup {
  label: string;
  exercises: string[];
}
