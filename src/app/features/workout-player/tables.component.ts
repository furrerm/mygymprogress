import {
  Component,
  OnInit,
  AfterContentInit,
  ViewChild,
  AfterViewChecked
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
  animations: [
    trigger('blendOutTriggerRef', [
      state('dark', style({
        filter: 'brightness(0%)'
      })),
      state('bright', style({
        filter: 'brightness(100%)'
      })),
      transition('bright <=> dark', animate('2000ms linear')),
      transition('dark <=> bright', animate('50ms linear'))
    ]),
    trigger('lastSetContainerTriggerRef', [
      state('opaque', style({
        opacity: 0.9
      })),
      state('transparent', style({
        opacity: 0.0
      })),
      transition('opaque <=> transparent', animate('2000ms linear')),
      transition('transparent <=> opaque', animate('500ms linear'))
    ])
  ]
})
export class TablesComponent implements OnInit, AfterContentInit, AfterViewChecked {

  public videoBlendOutTrigger = 'bright';
  public lastSetContainerBlendOutTrigger = 'opaque';

  public currentExercise: Exercise;
  private currentDayWorkout: Day;
  public currentVideoSrc: SafeResourceUrl = null;
  private savedWorkoutId: number;
  private dayWorkoutHandler: DayWorkoutHandler;

  public showEntryPanel: boolean;

  @ViewChild('videoPlayer') videoPlayer;
  @ViewChild('entryPanel') entryPanel;
  @ViewChild('lastSetContainer') lastSetContainer;

  public entryPanelWidth = 0;
  public entryPanelHeight = 0;

  public lastSetContainerPosition;
  public lastSetContainerDisplay = 'flex';
  public timeCounter = 0;

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
    this.listenForVideoChanges();
  }

  ngOnInit(): void {

  }

  ngAfterViewChecked(): void {
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
        this.dayWorkoutHandler.getExercise().subscribe(a => {
            this.currentExercise = a;
            if (this.currentExercise.userEntryRequired === true) {
              this.lastSetContainerDisplay = 'flex';
            } else {
              this.lastSetContainerDisplay = 'none';
            }
            a.videoSrc.subscribe(b => {
              if (b !== null) {
                this.currentVideoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(b));
                this.playerSettings(this.currentExercise);
              }
            });
          }
        );
      } else {
        this.showEntryPanel = true;
        this.entryPanelHeight = 700;
        this.entryPanelWidth = 900;
        this.currentDayWorkout = new WorkoutMock().day;
        this.currentExercise = this.currentDayWorkout.phases[0].exercises[0];
      }
    });
  }

  playerSettings(currentExercise: Exercise): void {
    this.timeCounter = currentExercise.timeLength;
    this.videoBlendOutTrigger = 'bright';
    this.showEntryPanel = false;
    const timeToPlay = currentExercise.timeLength * 1000;

    setTimeout(() => {
      this.videoBlendOutTrigger = 'dark';
    }, timeToPlay -22000);

    setTimeout(() => {
      this.lastSetContainerBlendOutTrigger = 'opaque';
    }, 2000);

    setTimeout(() => {
      this.lastSetContainerBlendOutTrigger = 'transparent';
    }, 5000);

  }

  nextExercise(): void {
    this.dayWorkoutHandler.nextExercise();
  }

  endWorkout(): void {
    const dayDTO = new WorkoutConverter().convertDayToDTO(this.currentDayWorkout);

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

  videoBlendOutCallback(event): void {

    if (this.videoBlendOutTrigger === 'dark') {
      const userEntryRequired = this.currentExercise.userEntryRequired;
      this.videoPlayer.nativeElement.pause();
      if (!userEntryRequired) {
        this.nextExercise();
      } else {
        this.showEntryPanel = true;
      }
    }
  }

  listenForVideoChanges(): void {
    let i = 0;
    setInterval(() => {
      ++i;
      if (this.videoPlayer !== undefined) {
        this.entryPanelWidth = this.videoPlayer.nativeElement.offsetWidth;
        this.entryPanelHeight = this.videoPlayer.nativeElement.offsetHeight;
        this.lastSetContainerPosition = this.videoPlayer.nativeElement.offsetHeight - this.lastSetContainer.nativeElement.offsetHeight;
        this.timeCounter--;
      }
    }, 1000);
  }
}
