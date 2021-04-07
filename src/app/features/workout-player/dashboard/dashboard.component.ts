import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {WorkoutMock} from '../WorkoutMock';
import {DomSanitizer} from '@angular/platform-browser';
import {ExerciseDTO} from '../../../core/model/swagger-model/exerciseDTO';
import {Day} from '../../../core/model/internal-model/day.model';
import {Exercise} from '../../../core/model/internal-model/exercise.model';
import {TablesComponent} from '../tables.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges{

  strengthIndex: Kpi = {name: 'Strength Index', value: 0};
  burnedCalories: Kpi = {name: 'BurnedCalories', value: 0};

  timeLeftInExercise;
  totalTimeInExercise;

  @Input() currentDayWorkout: Day;
  @Input() currentExercise: Exercise;
  @Input() tablesComponent: TablesComponent;

  constructor(private sanitizer: DomSanitizer) {
    // this.currentDayWorkout = new WorkoutMock(sanitizer).day;
    // this.currentExercise = this.currentDayWorkout.phases[0].exercises[0];
  }

  ngOnInit(): void {
    this.timeLeftInExercise = this.currentExercise.timeLength;
    this.totalTimeInExercise = this.currentExercise.timeLength;

    this.intervall();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.burnedCalories = this.calculateBurnedCalories(this.currentExercise);
    this.strengthIndex = this.calculateStrengthIndex(this.currentExercise);
  }

  currentExerciseChangeListener(exercise: ExerciseDTO): void {
    this.currentExercise = exercise;
    this.burnedCalories = this.calculateBurnedCalories(exercise);
    this.strengthIndex = this.calculateStrengthIndex(exercise);
  }

  intervall(): void {
    setInterval(() => {
      if (this.timeLeftInExercise > 0) {
        --this.timeLeftInExercise;
      }
    }, 1000);
  }

  calculateBurnedCalories(currentExercise: Exercise): Kpi {
    const exerciseSets = currentExercise.setsContainer[currentExercise.setsContainer.length - 1].exerciseSets;
    const value = exerciseSets
      .map(set => set.repetitions * set.weight * currentExercise.caloriesPerSecond)
      .reduce((val1, val2) => val1 + val2);
    if (value) {
      return {name: 'BurnedCalories', value};
    }
    return {name: 'BurnedCalories', value: 0};
  }

  calculateStrengthIndex(currentExercise: Exercise): Kpi {
    const exerciseSets = currentExercise.setsContainer[currentExercise.setsContainer.length - 1].exerciseSets;
    const value = exerciseSets.map(set => set.repetitions * set.weight).reduce((val1, val2) => val1 + val2);
    if (value) {
      return {name: 'Strength Index', value};
    }
    return {name: 'Strength Index', value: 0};

  }

}

export interface Kpi {
  name: string;
  value: number;
}
