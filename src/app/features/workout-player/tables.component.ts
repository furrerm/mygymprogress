import {Component, OnInit, AfterContentInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SavedWorkoutsService} from '../workout-list/saved-workouts.service';
import {LastSetService} from './last-set.service';
import {SaveSetsService} from './save-sets.service';
import {DayWorkoutHandlerFactory} from './DayWorkoutHandlerFactory';
import {DayWorkoutHandler} from './DayWorkoutHandler';
import {ExerciseDTO} from '../../core/model/swagger-model/exerciseDTO';
import {DayDTO} from '../../core/model/swagger-model/dayDTO';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit, AfterContentInit {

  private currentExercise: ExerciseDTO;
  private currentDayWorkout: DayDTO;
  private savedWorkoutId: number;
  private dayWorkoutHandler: DayWorkoutHandler;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private savedWorkoutService: SavedWorkoutsService,
    private lastSetService: LastSetService,
    private saveSetsService: SaveSetsService) {

    console.log(savedWorkoutService);
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
        this.dayWorkoutHandler.getWorkout().subscribe(a =>
          this.currentDayWorkout = a
        );
        this.dayWorkoutHandler.getExercise().subscribe(a =>
          this.currentExercise = a
        );
      });
    });
  }

  nextExercise() {
    this.dayWorkoutHandler.nextExercise();
  }

  endWorkout() {
    this.saveSetsService.saveSets(this.currentDayWorkout, this.savedWorkoutId)
      .subscribe(a => {
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
