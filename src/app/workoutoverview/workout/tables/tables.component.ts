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
import {DayWorkoutHandlerFactory} from './DayWorkoutHandlerFactory';
import {DayWorkoutHandler} from './DayWorkoutHandler';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit, AfterContentInit {

  private currentExercise: Exercise;
  private currentDayWorkout: Day;
  private savedWorkoutId: number;
  private dayWorkoutHandler: DayWorkoutHandler;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private savedWorkoutService: SavedWorkoutsService,
              private lastSetService: LastSetService,
              private saveSetsService: SaveSetsService) {
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.savedWorkoutService.initializeWorkouts();
    this.route.paramMap.subscribe(params => {
      this.savedWorkoutId = +params.get('savedWorkoutId');
      const dayId: number = +params.get('dayId');
      this.savedWorkoutService.getSavedWorkouts.subscribe(savedWorkouts => {
        const dayWorkoutHandlerFactory: DayWorkoutHandlerFactory = new DayWorkoutHandlerFactory(savedWorkouts, this.lastSetService);
        this.dayWorkoutHandler = dayWorkoutHandlerFactory.createDayWorkoutHandlerFromIds(this.savedWorkoutId, dayId);
        this.dayWorkoutHandler.getWorkout().subscribe(a => this.currentDayWorkout = a);
        this.dayWorkoutHandler.getExercise().subscribe(a => this.currentExercise = a);
      });
    });
  }
  nextExercise() {
    this.dayWorkoutHandler.nextExercise();
  }

  endWorkout() {
    this.saveSetsService.saveSets(this.currentDayWorkout, this.savedWorkoutId).subscribe(a => {
      this.router.navigate(['/workoutoverview']);
    });
  }

  getCurrentExercise() {
    return this.currentExercise;
  }
  isLastExerciseOfDayWorkout() {
    return this.dayWorkoutHandler?.isLastExerciseOfDayWorkout();
  }
}
