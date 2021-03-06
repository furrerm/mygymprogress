import {Component, OnInit, ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {NavigationEnd, Router} from '@angular/router';
import {ConstantsService} from '../../core/services/constants.service';
import {WelcomeComponent} from '../../features/welcome/welcome.component';

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
  @ViewChild('sidenav') sidenav: MatSidenav;
  private distFolderLocation: string;

  constructor(private router: Router,
              private constant: ConstantsService,
              private welcomeComponent: WelcomeComponent) {
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
