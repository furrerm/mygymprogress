import {Component, OnInit} from '@angular/core';
import {WorkoutMock} from '../WorkoutMock';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  timeLeftInExercise;
  totalTimeInExercise;

  currentDayWorkout = new WorkoutMock().day;
  currentExercise = this.currentDayWorkout.phases[0].exercises[0];

  constructor() {
  }

  ngOnInit(): void {
    this.timeLeftInExercise = this.currentExercise.timeLength;
    this.totalTimeInExercise = this.currentExercise.timeLength;

    this.intervall();
  }

  intervall(): void {
    setInterval(() => {
      if (this.timeLeftInExercise > 0) {
        --this.timeLeftInExercise;
      }
    }, 1000);
  }
}
