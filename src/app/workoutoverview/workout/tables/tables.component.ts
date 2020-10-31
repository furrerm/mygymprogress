import {Component, Input, OnInit, ViewChild, AfterViewInit, AfterContentInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CurrentSetComponent} from './current-set/current-set.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SavedWorkoutsService} from '../saved-workouts.service';
import {Day, Exercise, Phase, SavedWorkouts} from '../saved-workouts.Workout';
import {WorkoutsService} from '../workouts.service';
import {WorkoutpreviewpicturesService} from '../../workoutpreviewpictures.service';
import {toNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';
import {LastSetService} from './last-set.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit, AfterContentInit {
  // @ViewChild(CurrentSetComponent, {static: true}) child: CurrentSetComponent;
  private currentExercise: Exercise;
  private workouts: SavedWorkouts[] = [];
  private currentDayWorkout: Day;
  private savedWorkoutId: number;
  private dayId: number;
  private exerciseIds: number[] = [];
  private currentExerciseIds: CurrentExerciseIds;

  constructor(private route: ActivatedRoute,
              private workoutsService: WorkoutsService,
              private workoutpreviewpicturesService: WorkoutpreviewpicturesService,
              private savedWorkoutService: SavedWorkoutsService,
              private lastSetService: LastSetService) {
    this.currentExerciseIds = {phaseNumber: 0, exerciseNumber: 0};
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.route.paramMap.subscribe(params => {
      this.savedWorkoutId = +params.get('savedWorkoutId');
      this.dayId = +params.get('dayId');
      this.savedWorkoutService.getSavedWorkouts.subscribe(data => {
        this.workouts = data;
        if (this.workouts[this.savedWorkoutId]) {
          this.currentDayWorkout = this.workouts[this.savedWorkoutId].days.find(a => a.id === this.dayId);
          this.exerciseIds = [].concat(...this.currentDayWorkout.phases.map(a => a.exercises)).map(a => a.id);
          this.lastSetService.getSets(this.exerciseIds, this.dayId).subscribe(sets => {
            console.log(sets);
            const workoutsAsJson = JSON.parse(JSON.stringify(sets));
            console.log(workoutsAsJson);
            workoutsAsJson.forEach(a => a.setsContainer.forEach(b => b.exerciseSets.forEach(c =>
              this.currentDayWorkout.phases.forEach(d => d.exercises.forEach(e => {
                if (e.id === a.id) {
                  e.setContainers = a.setsContainer;
                }
              }))
            )));
            this.currentExercise = this.currentDayWorkout.phases[this.currentExerciseIds.phaseNumber].exercises[this.currentExerciseIds.exerciseNumber];
            console.log(this.currentDayWorkout);
          });
        }
      });
    });
    this.savedWorkoutService.initializeWorkouts();
  }

  nextExercise() {
    console.log(this.currentExerciseIds.phaseNumber);

    if (this.currentDayWorkout.phases[this.currentExerciseIds.phaseNumber].exercises[this.currentExerciseIds.exerciseNumber + 1]) {
      this.currentExerciseIds.exerciseNumber++;
      this.currentExercise =
        this.currentDayWorkout.phases[this.currentExerciseIds.phaseNumber].exercises[this.currentExerciseIds.exerciseNumber];
      return;
    } else if (this.currentDayWorkout.phases[this.currentExerciseIds.phaseNumber + 1]) {
      this.currentExerciseIds.phaseNumber++;
      this.currentExercise = this.currentDayWorkout.phases[this.currentExerciseIds.phaseNumber].exercises[0];
      return;
    } else {
      this.currentExercise = this.currentDayWorkout.phases[0].exercises[0];
      this.currentExerciseIds = {phaseNumber: 0, exerciseNumber: 0};
    }
  }
}

interface CurrentExerciseIds {
  phaseNumber: number;
  exerciseNumber: number;
}
