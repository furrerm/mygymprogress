import {Component, OnInit, AfterContentInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SavedWorkoutsService} from '../workout-list/shared/saved-workouts.service';
import {LastSetService} from './shared/last-set.service';
import {SaveSetsService} from './shared/save-sets.service';
import {DayWorkoutHandlerFactory} from './DayWorkoutHandlerFactory';
import {DayWorkoutHandler, DayWorkoutHandlerExerciseBased} from './DayWorkoutHandler';
import {ExerciseDTO} from '../../core/model/swagger-model/exerciseDTO';
import {DayDTO} from '../../core/model/swagger-model/dayDTO';
import {ConstantsService} from '../../core/services/constants.service';
import {WorkoutsService} from '../workout-list/shared/workouts.service';
import {Day} from '../../core/model/internal-model/day.model';
import {Exercise} from '../../core/model/internal-model/exercise.model';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit, AfterContentInit {

  public currentExercise: Exercise;
  private currentDayWorkout: Day;
  private savedWorkoutId: number;
  private dayWorkoutHandler: DayWorkoutHandler;

  public showEntryPanel: boolean;
  private video: Blob;

  @ViewChild('pla') playerVideo;
  @ViewChild('videoPlayerResource') videoPlayerResource;
  public videoSrc = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private savedWorkoutService: SavedWorkoutsService,
    private lastSetService: LastSetService,
    private saveSetsService: SaveSetsService,
    private constants: ConstantsService,
    private workoutsService: WorkoutsService,
    private readonly sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.route.paramMap.subscribe(params => {
      this.currentDayWorkout = this.workoutsService.day;

      this.dayWorkoutHandler = new DayWorkoutHandlerExerciseBased(this.currentDayWorkout, this.lastSetService, this.constants, this.sanitizer);
      this.dayWorkoutHandler.getWorkout().subscribe(a =>
        this.currentDayWorkout = a
      );
      this.dayWorkoutHandler.getExercise().subscribe(a => {
          this.currentExercise = a;
          // this.playerSettings(this.currentExercise);
          this.playerSettings(this.currentExercise);
        }
      );
    });

  }

  playerSettings(currentExercise: Exercise): void {

    this.showEntryPanel = false;
    const timeToPlay = currentExercise.timeLength * 1000;
    const timeBased = currentExercise.timeBased;

    setTimeout(() => {
      this.playerVideo.nativeElement.pause();
      if (timeBased) {
        this.nextExercise();
      } else {
        this.showEntryPanel = true;
      }
    }, timeToPlay);
  }

  nextExercise() {
    this.dayWorkoutHandler.nextExercise();
    console.log(this.currentExercise);
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
