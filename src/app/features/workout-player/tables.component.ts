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
export class TablesComponent implements OnInit, AfterContentInit, AfterViewInit {
// todo: try removing the audio with "HandBrake" or the online audion remover. If it works try programticaly
  screenHeight: number;
  screenWidth: number;

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
  @ViewChild('contentDiv') contentDiv;

  public videoPanelWidth = 0;
  public videoPanelHeight;

  public mobileEntryPanelHeight;
  public paddingForContent = 0;

  public lastSetContainerPosition;
  public lastSetContainerDisplay = 'flex';
  public timeCounter = 0;

  public fullscreen = false;

  private TOPMARGIN = 85;

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
    this.listenForVideoChanges();
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?): void {
    this.setHTMLFrameView();
  }

  private setHTMLFrameView(): void {

    // this.setVideoPlayerDimensions();
    if (this.contentDiv != null) {
      const marginTopInPx = window.getComputedStyle(this.contentDiv.nativeElement, null).marginTop;
      const marginTop = parseInt(marginTopInPx.substring(0, marginTopInPx.indexOf('px')), 0);
      this.TOPMARGIN = 35;
      if (marginTop != null) {
        this.TOPMARGIN += marginTop;
      }
    }
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if (this.workoutsService.day) {
      // this.setVideoPlayerDimensions();
      if (this.screenWidth < 450) {
        this.videoPanelWidth = this.screenWidth;
        this.paddingForContent = this.screenHeight - this.TOPMARGIN;
        this.videoPanelHeight = this.screenWidth * 3 / 4;
        this.mobileEntryPanelHeight = this.screenHeight - this.videoPanelHeight - this.TOPMARGIN;
      } else if (this.screenHeight < 750) {
        // this.videoPanelWidth = this.screenWidth;
        this.view = VIEW.MobileLandscape;
        this.fullscreen = true;
        this.paddingForContent = this.screenHeight - this.TOPMARGIN;
        this.videoPanelHeight = '80%';
        this.mobileEntryPanelHeight = '80%';
      } else {
        this.videoPanelHeight = 750; // 700
        this.videoPanelWidth = 1000; // 900
        // this.paddingForContent = this.videoPanelHeight - this.TOPMARGIN;
        // this.mobileEntryPanelHeight = '100%';
      }
    } else {
      // whole else clause is only for testing and can be deleted
      if (this.screenWidth < 450) {
        this.videoPanelWidth = this.screenWidth;
        this.paddingForContent = this.screenHeight - this.TOPMARGIN;
        this.videoPanelHeight = this.screenWidth * 3 / 4;
        // this.mobileEntryPanelHeight = this.screenHeight - this.videoPanelHeight - this.TOPMARGIN;
      } else if (this.screenHeight < 750) {
        this.videoPanelWidth = this.screenWidth;
        this.videoPanelHeight = '100%';
        this.paddingForContent = this.screenHeight - this.TOPMARGIN;
        this.mobileEntryPanelHeight = '100%';
      } else {
        this.videoPanelHeight = 750; // 700
        this.videoPanelWidth = 1000; // 900
      }
    }


  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.setHTMLFrameView();
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

                this.changeDetectorRef.detectChanges();
              }
            });
          }
        );
      } else {
        this.showEntryPanel = true;
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
    }, timeToPlay);

    setTimeout(() => {
      this.lastSetContainerBlendOutTrigger = 'opaque';
    }, 2000);

    setTimeout(() => {
      this.lastSetContainerBlendOutTrigger = 'transparent';
    }, 5000);
  }

  nextExercise(): void {
    if (this.view === VIEW.MobileLandscape) {
      this.fullscreen = true;
    }
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
        this.fullscreen = false;
      }
    }
  }

  listenForVideoChanges(): void {
    let i = 0;
    setInterval(() => {
      ++i;
      if (this.videoPlayer !== undefined) {
        this.setVideoPlayerDimensions();
        // this.lastSetContainerPosition = this.videoPlayer.nativeElement.offsetHeight - this.lastSetContainer.nativeElement.offsetHeight;
        this.timeCounter = this.timeCounter > 0 ? --this.timeCounter : 0;
      }
    }, 1000);
  }

  private setVideoPlayerDimensions(): void {

    this.videoPanelWidth = this.videoPlayer.nativeElement.offsetWidth;
    this.videoPanelHeight = this.videoPlayer.nativeElement.offsetHeight;

    this.mobileEntryPanelHeight = '100%';

    if (this.screenWidth < 450) {
      this.mobileEntryPanelHeight = this.screenHeight - this.videoPanelHeight - this.TOPMARGIN;
    }

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
