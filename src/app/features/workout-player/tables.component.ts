import {
  Component,
  OnInit,
  AfterContentInit,
  ViewChild,
  SecurityContext,
  ElementRef,
  ViewChildren,
  QueryList,
  AfterViewInit, AfterViewChecked, ChangeDetectorRef
} from '@angular/core';
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
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {WorkoutMock} from './WorkoutMock';
import {WorkoutConverter} from '../../core/model/converter/workout-converter';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
  animations: [

    // todo: use filter:brightness(400%);} for video brightness animation
    trigger('testTriggerRef', [
      state('unTriggerd', style({
        filter: 'brightness(0%)'
      })),
      state('triggerd', style({
        filter: 'brightness(100%)'
      })),
      transition('triggerd <=> unTriggerd', animate('50ms linear')),
      transition('unTriggerd <=> triggerd', animate('50ms linear'))
    ]),
    trigger('lastSetContainerTriggerRef', [
      state('triggerd', style({
        opacity: 0.9
      })),
      state('untriggerd', style({
        opacity: 0.0
      })),
      transition('triggerd <=> untriggerd', animate('2000ms linear')),
      transition('untriggerd <=> triggerd', animate('500ms linear'))
    ])
  ]
})
export class TablesComponent implements OnInit, AfterContentInit, AfterViewChecked {

  public testTriggerToDelete = 'triggerd';
  public lastSetContainerTrigger = 'triggerd';

  public currentExercise: Exercise;
  private currentDayWorkout: Day;
  public currentVideoSrc: SafeResourceUrl = null;
  private savedWorkoutId: number;
  private dayWorkoutHandler: DayWorkoutHandler;

  public showEntryPanel: boolean;
  private video: Blob;

  @ViewChild('pla') playerVideo;
  @ViewChildren('pla', {read: ElementRef}) el: QueryList<ElementRef>;
  @ViewChild('videoPlayerResource') videoPlayerResource;
  @ViewChild('entryPanel') entryPanel;
  @ViewChild('lastSetContainer') lastSetContainer;
  public videoSrc = '';

  public entryPanelWidth = 0;
  public entryPanelHeight = 0;

  public lastSetContainerPosition;

  public videoWidth;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private savedWorkoutService: SavedWorkoutsService,
    private lastSetService: LastSetService,
    private saveSetsService: SaveSetsService,
    private constants: ConstantsService,
    private workoutsService: WorkoutsService,
    private readonly sanitizer: DomSanitizer,
    private cdRef: ChangeDetectorRef
  ) {
    this.listenForVideoChanges();
  }

  ngOnInit(): void {

  }

  ngAfterViewChecked(): void {
    this.listenForPlotChanges(this.el);
    this.cdRef.detectChanges();

  }

  ngAfterContentInit(): void {
    this.route.paramMap.subscribe(params => {
      if (this.workoutsService.day) {
        this.currentDayWorkout = this.workoutsService.day;
        this.dayWorkoutHandler = new DayWorkoutHandlerExerciseBased(this.currentDayWorkout, this.lastSetService, this.constants, this.sanitizer);
        this.dayWorkoutHandler.getWorkout().subscribe(a =>
          this.currentDayWorkout = a
        );
        this.dayWorkoutHandler.getExercise().subscribe(a => {
            this.currentExercise = a;
            a.videoSrc.subscribe(b => {
              if (b !== null) {
                this.currentVideoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(b));
                this.playerSettings(this.currentExercise);
                this.cdRef.detectChanges();

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

  listenForPlotChanges(elementQueryList: QueryList<ElementRef>): void {
    elementQueryList.changes.subscribe(next1 => {
        this.cdRef.detectChanges();
      }
    );
  }

  playerSettings(currentExercise: Exercise): void {
    this.testTriggerToDelete = 'triggerd';
    this.showEntryPanel = false;
    const timeToPlay = currentExercise.timeLength * 1000;


    setTimeout(() => {
      this.testTriggerToDelete = 'unTriggerd';


    }, timeToPlay - 15000);

    setTimeout(() => {
      this.lastSetContainerTrigger = 'triggerd';
    }, 2000);

    setTimeout(() => {
      this.lastSetContainerTrigger = 'untriggerd';
    }, 8000);

  }

  nextExercise() {

    this.dayWorkoutHandler.nextExercise();
    console.log(this.currentExercise);
  }

  endWorkout() {
    const dayDTO = new WorkoutConverter().convertDayToDTO(this.currentDayWorkout);

    this.saveSetsService.saveSets(dayDTO, this.savedWorkoutId)
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

  videoBlendOutCallback(event): void {

    if (this.testTriggerToDelete === 'unTriggerd') {
      const userEntryRequired = this.currentExercise.userEntryRequired;
      this.playerVideo.nativeElement.pause();
      if (!userEntryRequired) {
        this.nextExercise();
      } else {
        this.showEntryPanel = true;
        this.cdRef.detectChanges();
      }
    }

  }

  listenForVideoChanges(): void {
    let i = 0;
    setInterval(() => {
      ++i;
      if (this.playerVideo !== undefined) {
        this.entryPanelWidth = this.playerVideo.nativeElement.offsetWidth;
        this.entryPanelHeight = this.playerVideo.nativeElement.offsetHeight;

        this.lastSetContainerPosition = this.playerVideo.nativeElement.offsetHeight - this.lastSetContainer.nativeElement.offsetHeight;

      }
    }, 1000);
  }
}
