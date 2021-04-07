import {
  Component,
  OnInit,
  AfterContentInit,
  ViewChild,
  AfterViewChecked,
  HostListener, AfterViewInit, ChangeDetectorRef
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SavedWorkoutsService} from '../workout-list/shared/saved-workouts.service';
import {LastSetService} from './shared/last-set.service';
import {SaveSetsService} from './shared/save-sets.service';
import {DayWorkoutHandler, DayWorkoutHandlerExerciseBased} from './DayWorkoutHandler';
import {ConstantsService} from '../../core/services/constants.service';
import {WorkoutsService} from '../workout-list/shared/workouts.service';
import {Day} from '../../core/model/internal-model/day.model';
import {Exercise} from '../../core/model/internal-model/exercise.model';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {WorkoutMock} from './WorkoutMock';
import {WorkoutConverter} from '../../core/model/converter/workout-converter';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],

})
export class TablesComponent implements OnInit, AfterContentInit, AfterViewInit {
// todo: try removing the audio with "HandBrake" or the online audion remover. If it works try programticaly


  public currentExercise: Exercise;
  private currentDayWorkout: Day;
  public currentVideoSrc: SafeResourceUrl = null;
  private savedWorkoutId: number;
  private dayWorkoutHandler: DayWorkoutHandler;

  public showEntryPanel: boolean;
  private fileReader = new FileReader();

  @ViewChild('entryPanel') entryPanel;

  @ViewChild('contentDiv') contentDiv;

  public paddingForContent = 0;

  public lastSetContainerPosition;

  public timeCounter = 0;

  public fullscreen = false;

  public view: VIEW;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private savedWorkoutService: SavedWorkoutsService,
    private lastSetService: LastSetService,
    private saveSetsService: SaveSetsService,
    private constants: ConstantsService,
    private workoutsService: WorkoutsService,
    private readonly sanitizer: DomSanitizer,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.startTimer();
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngAfterContentInit(): void {

    this.route.paramMap.subscribe(params => {
      // todo: use params for reloading the right day Workout
      if (this.workoutsService.day) {
        this.currentDayWorkout = this.workoutsService.day;
        this.dayWorkoutHandler = new DayWorkoutHandlerExerciseBased(
          this.currentDayWorkout,
          this.lastSetService,
          this.constants,
          this.sanitizer);
        this.dayWorkoutHandler.getWorkout().subscribe(a =>
          this.currentDayWorkout = a
        );
        this.dayWorkoutHandler.getExercise().subscribe(exercise => {
            this.currentExercise = exercise;
            if (exercise) {
              exercise.videoSrc.subscribe(videoUrl => {
                if (videoUrl !== null) {
                  this.currentVideoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(videoUrl));

                  this.changeDetectorRef.detectChanges();
                  this.fileReader.readAsDataURL(videoUrl);

                }
              });
            }
          }
        );
      } else {
        this.showEntryPanel = true;
        this.currentDayWorkout = new WorkoutMock(this.sanitizer).day;
        this.currentExercise = this.currentDayWorkout.phases[0].exercises[0];
      }
    });
  }

  getNextExercise(): Exercise {
    return this.dayWorkoutHandler.getNextExercise();
  }


  nextExercise(): void {
    if (this.view === VIEW.MobileLandscape) {
      this.fullscreen = true;
    }
    this.dayWorkoutHandler.nextExercise();
  }

  endWorkout(): void {
    const dayDTO = new WorkoutConverter(this.sanitizer).convertDayToDTO(this.currentDayWorkout);

    this.saveSetsService.saveSets(dayDTO, this.savedWorkoutId)
      .subscribe(a => {
        this.router.navigate(['/workoutoverview']);
      });
  }

  getCurrentExercise(): Exercise {
    return this.currentExercise;
  }

  isLastExerciseOfDayWorkout(): boolean {
    return this.dayWorkoutHandler?.isLastExerciseOfDayWorkout();
  }


  startTimer(): void {

    setInterval(() => {
      this.timeCounter = this.timeCounter > 0 ? --this.timeCounter : 0;
    }, 1000);
  }

  public get VIEW(): typeof VIEW {
    return VIEW;
  }

}

export enum VIEW {
  MobilePortrait,
  MobileLandscape,
  Laptop
}
