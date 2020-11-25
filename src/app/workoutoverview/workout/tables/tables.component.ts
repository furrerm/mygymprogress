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
  // @ViewChild(CurrentSetComponent, {static: true}) child: CurrentSetComponent;
  private currentExercise: Exercise;
  private workouts: SavedWorkouts[] = [];
  private currentDayWorkout: Day;
  private savedWorkoutId: number;
  private dayId: number;
  private exerciseIds: number[] = [];
  private dayWorkoutHandler: DayWorkoutHandler;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private workoutsService: WorkoutsService,
              private workoutpreviewpicturesService: WorkoutpreviewpicturesService,
              private savedWorkoutService: SavedWorkoutsService,
              private lastSetService: LastSetService,
              private saveSetsService: SaveSetsService) {
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.savedWorkoutService.initializeWorkouts();
    this.route.paramMap.subscribe(params => {
      const workoutId: number = +params.get('savedWorkoutId');
      const dayId: number = +params.get('dayId');
      this.savedWorkoutService.getSavedWorkouts.subscribe(data => {
        const dayWorkoutHandlerFactory: DayWorkoutHandlerFactory = new DayWorkoutHandlerFactory(data, this.lastSetService);
        this.dayWorkoutHandler = dayWorkoutHandlerFactory.createDayWorkoutHandlerFromIds(workoutId, dayId);
        this.currentExercise = this.dayWorkoutHandler.nextExercise();
      });
    });
  }
  nextExercise() {
    this.currentExercise = this.dayWorkoutHandler.nextExercise();
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
