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
  title = 'Placeholder';

  constructor(private router: Router,
              private constant: ConstantsService,
              private welcomeComponent: WelcomeComponent) {
  }

  ngOnInit() {
  }

  logout() {
    console.log('logout');
    this.welcomeComponent.authService.SignOut(this.welcomeComponent.user);
  }
}

interface ExerciseGroup {
  label: string;
  exercises: string[];
}
