import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { MenuServiceService } from './menu-service.service';
import {printLine} from 'tslint/lib/verify/lines';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  opened: boolean;
  status: boolean;
  title = 'CRS';
  excerciseGroups: ExcerciseGroup[];
  workoutGroups: string;
  exercises: string;
  group: string;
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;

  constructor(private menuServiceService: MenuServiceService) {
    this.status = false;
    this.opened = false;
    this.workoutGroups = 'hiddenWorkouts';
    this.exercises = 'hiddenExercises';
    // const obj1 = {label: 'Chest', exercises: ['benchpress', 'flying', 'dumbells']};
    // this.excerciseGroups = [obj1, {label: 'Bicesps', exercises: ['curls', 'side curls']}];
  }

  ngOnInit() {
    this.excerciseGroups = this.getExerciseGroups();
  }

  getExerciseGroups(): ExcerciseGroup[] {
    const obj1 = {label: 'Chest', exercises: ['benchpress', 'flying', 'dumbells']};
    const excerciseGroupsLoc = [obj1];
    excerciseGroupsLoc.push({label: 'Bicesps', exercises: ['curls', 'side curls']});

    /*
    this.winnings = [];
    let numbs = [];

    this.winningService.getWinnings1().subscribe(winningsLoc => {
      this.winnings = [];
      console.log(winningsLoc);
      console.log(typeof winningsLoc);

      var stringified = JSON.stringify(winningsLoc);
      var parsedObj = JSON.parse(stringified);

      //let winningsLocParsed = JSON.parse(winningsLoc.toString())
      let winningsLocParsed = parsedObj;

      winningsLocParsed.forEach(x => {
        console.log(x);
        let s = Object.assign(new Winning(), x);

        this.winnings.push(s);
      });

      console.log(this.winnings); // put graph filling
      numbs = this.winnings.map(x => x.amount);
      console.log(numbs);
      this.lineChartData = [
        { data: numbs, label: 'running total of winnings' },
      ];
    });
    */
    return excerciseGroupsLoc;
  }
  clickEvent() {
    this.status = !this.status;
    console.log('status = '.concat( String(this.status)));
    this.opened = !this.opened;
  }
  showWorkoutGroups() {
    this.workoutGroups = (this.workoutGroups === 'visibleWorkouts') ?  'hiddenWorkouts' : 'visibleWorkouts';
  }
  hideWorkoutGroups() {
    this.workoutGroups = 'hiddenWorkouts';
  }
  showExercises(excerciseGroup: ExcerciseGroup) {
    this.group = excerciseGroup.label;
    this.exercises = (this.exercises === 'visibleExercises') ?  'hiddenExercises' : 'visibleExercises';
  }
}
interface ExcerciseGroup {
  label: string;
  exercises: string[];
}
