import {Component, Input, OnInit, ViewChild, AfterViewInit, AfterContentInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CurrentSetComponent} from './current-set/current-set.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SavedWorkoutsService} from '../saved-workouts.service';
import {Day, Exercise, ExerciseSet, Phase, SavedWorkouts, SetContainer} from '../saved-workouts.Workout';
import {WorkoutsService} from '../workouts.service';
import {WorkoutpreviewpicturesService} from '../../workoutpreviewpictures.service';
import {toNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';
import {LastSetService} from './last-set.service';
import {SaveSetsService} from './save-sets.service';
import {Timestamp} from 'rxjs';

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
              private router: Router,
              private workoutsService: WorkoutsService,
              private workoutpreviewpicturesService: WorkoutpreviewpicturesService,
              private savedWorkoutService: SavedWorkoutsService,
              private lastSetService: LastSetService,
              private saveSetsService: SaveSetsService) {
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
          this.currentDayWorkout = this.workouts.find(a => a.id === this.savedWorkoutId).days.find(a => a.id === this.dayId);
          this.exerciseIds = [].concat(...this.currentDayWorkout.phases.map(a => a.exercises)).map(a => a.id);
          this.lastSetService.getSets(this.exerciseIds, this.dayId).subscribe(sets => {
            console.log(sets);
            const workoutsAsJson = JSON.parse(JSON.stringify(sets));
            console.log(workoutsAsJson);
            workoutsAsJson.forEach(a => a.setsContainer.forEach(b => b.exerciseSets.forEach(c =>
              this.currentDayWorkout.phases.forEach(d => d.exercises.forEach(e => {
                if (e.id === a.id) {
                  e.setsContainer = a.setsContainer;
                }
              }))
            )));
            this.currentDayWorkout.phases.forEach(a => a.exercises.
            forEach(b => b.setsContainer.
            forEach(c => c.timeOfExercise = new Date(c.timeOfExercise))));
            const phaseNumber: number = this.currentExerciseIds.phaseNumber;
            const exerciseNumber: number = this.currentExerciseIds.exerciseNumber;
            this.currentExercise = this.currentDayWorkout.phases[phaseNumber].exercises[exerciseNumber];
            this.currentExercise.setsContainer = this.copyLastEntry(this.currentExercise.setsContainer);
          });
        }
      });
    });
    this.savedWorkoutService.initializeWorkouts();
  }

  private copyLastEntry(setsContainers: SetContainer[]) {
    if (setsContainers) {
      setsContainers.sort((a, b) => new Date(a.timeOfExercise).getTime() - new Date(b.timeOfExercise).getTime());
      const containerLength = this.currentExercise.setsContainer.length;
      setsContainers.push(this.createCopy(this.currentExercise.setsContainer[containerLength - 1]));
      setsContainers[containerLength].timeOfExercise = new Date(Date.now());
    } else {
      const setsContainersToCreate: SetContainer[] = [];
      const initialExerciseSets: ExerciseSet[] = [];
      initialExerciseSets.push({id: 0, weight: 0, repetitions: 0});
      initialExerciseSets.push({id: 0, weight: 0, repetitions: 0});
      initialExerciseSets.push({id: 0, weight: 0, repetitions: 0});
      setsContainersToCreate.push({timeOfExercise: new Date(Date.now()), exerciseSets: initialExerciseSets});
      setsContainers = setsContainersToCreate;
    }
    return setsContainers;
  }

  private createCopy(inputSetContainer: SetContainer): SetContainer {
    const exerciseSetsCopy: ExerciseSet[] = inputSetContainer.exerciseSets.map(a => {
      const exerciseSetTemp: ExerciseSet = {id: a.id, repetitions: a.repetitions, weight: a.weight};
      return exerciseSetTemp;
    });
    const setContainer: SetContainer = {timeOfExercise: new Date(inputSetContainer.timeOfExercise), exerciseSets: exerciseSetsCopy};
    return setContainer;
  }

  nextExercise() {
    const currentPhaseId = this.currentExerciseIds.phaseNumber;
    const currentExerciseId = this.currentExerciseIds.exerciseNumber;
    const phases = this.currentDayWorkout.phases;
    const exercises = phases[currentPhaseId].exercises;
    if (!this.isLastExerciseOfDayWorkout()) {
      if (exercises[currentExerciseId + 1]) {
        this.currentExerciseIds.exerciseNumber++;
        this.currentExercise = exercises[this.currentExerciseIds.exerciseNumber];
      } else if (phases[currentPhaseId + 1]) {
        this.currentExerciseIds.phaseNumber++;
        this.currentExercise = phases[this.currentExerciseIds.phaseNumber].exercises[0];
      }
      this.currentExercise.setsContainer = this.copyLastEntry(this.currentExercise.setsContainer);
    }
  }

  isLastPhaseOfDayWorkout(): boolean {
    const currentPhaseId = this.currentExerciseIds.phaseNumber;
    const phases = this.currentDayWorkout.phases;
    if (phases[currentPhaseId + 1]) {
      return false;
    }
    return true;
  }

  isLastExerciseOfPhase(): boolean {
    const currentPhaseId = this.currentExerciseIds.phaseNumber;
    const currentExerciseId = this.currentExerciseIds.exerciseNumber;
    const phases = this.currentDayWorkout.phases;
    const exercises = phases[currentPhaseId].exercises;
    if (exercises[currentExerciseId + 1]) {
      return false;
    }
    return true;
  }

  isLastExerciseOfDayWorkout(): boolean {
    return this.isLastPhaseOfDayWorkout() && this.isLastExerciseOfPhase();
  }

  endWorkout() {
    this.saveSetsService.saveSets(this.currentDayWorkout, this.savedWorkoutId).subscribe(a => {
      this.router.navigate(['/workoutoverview']);
    });
  }
}

interface CurrentExerciseIds {
  phaseNumber: number;
  exerciseNumber: number;
}
