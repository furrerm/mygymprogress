import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {MenuServiceService} from './menu-service.service';
import {printLine} from 'tslint/lib/verify/lines';
import {LastSetServiceService} from '../workout/tables/last-set/last-set-service.service';
import {NavigationEnd, Router} from '@angular/router';
import {ConstantsService} from '../common/services/constants.service';

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
              private constant: ConstantsService) {
    this.opened = false;
    this.workoutGroups = 'hiddenWorkouts';
    this.exercises = 'hiddenExercises';
    this.distFolderLocation = constant.baseAppUrl;
  }

  /*
  stateClickedLink(vari: string): void {
    console.log(vari);
    this.router.navigate(['workout', vari]);
  }
   */
  ngOnInit() {
    // this.exerciseGroups = this.getExerciseGroups();
/*
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.router.onSameUrlNavigation = 'reload';
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
 */
  }
/*
  getExerciseGroups(): ExerciseGroup[] {
    const obj1 = {label: 'Chest', exercises: ['benchpress', 'flying', 'dumbells']};
    const excerciseGroupsLoc = [obj1];
    excerciseGroupsLoc.push({label: 'Bicesps', exercises: ['curls', 'side curls']});


    this.menuServiceService.fetchExerciseGroups().subscribe(winningsLoc => {
      const exerciseGroups = JSON.parse(JSON.stringify(winningsLoc));
      this.exerciseGroups = [];
      exerciseGroups.forEach(x => {
        this.exerciseGroups.push({label: x.name, exercises: x.exercises});
      });

    });
    return excerciseGroupsLoc;
  }

  showWorkoutGroups() {
    console.log('ins workout groups');
    this.workoutGroups = (this.workoutGroups === 'visibleWorkouts') ? 'hiddenWorkouts' : 'visibleWorkouts';
  }

  hideWorkoutGroups() {
    this.workoutGroups = 'hiddenWorkouts';
  }

  showExercises(exerciseGroup: ExerciseGroup) {
    this.group = exerciseGroup.label;
    this.exercises = (this.exercises === 'visibleExercises') ? 'hiddenExercises' : 'visibleExercises';
  }

  public makeString(param: string): string {
    console.log(param);
    return JSON.stringify(param);
  }
 */
  openCloseSideNavigation() {
    this.opened = !this.opened;
  }
}

interface ExerciseGroup {
  label: string;
  exercises: string[];
}
