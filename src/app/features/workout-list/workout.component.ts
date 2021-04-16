import {Component, Injectable, OnInit, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkoutsService} from './shared/workouts.service';
import {ConstantsService} from '../../core/services/constants.service';
import {WorkoutOverviewPicturesService} from '../workoutoverview/shared/workout-overview-pictures.service';
import {WorkoutListingsInterface} from './shared/workout-listings-interface';
import {AllWorkoutListingsService} from './shared/all-workout-listings.service';
import {CacheService} from '../../core/services/cache.service';
import {FilterGroupDTO} from 'src/app/core/model/swagger-model/filterGroupDTO';
import {Workout} from '../../core/model/internal-model/workout.model';
import {WorkoutConverter} from '../../core/model/converter/workout-converter';
import {DomSanitizer} from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css', '../../shared/shared.style.css'],
})
export class WorkoutComponent implements OnInit {
  exercise: string;
  _workouts: Workout[] = [];
  private counter = 0;
  private offsetId = -1;


  private workoutListingsService: WorkoutListingsInterface;

  filterGroups: FilterGroupDTO[] = [];
  filterExpanded = false;
  private workoutConverter: WorkoutConverter;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workoutsService: WorkoutsService,
    private constants: ConstantsService,
    private cacheService: CacheService,
    private workoutOverviewPicturesService: WorkoutOverviewPicturesService,
    private el: ElementRef,
    private allWorkoutListingsService: AllWorkoutListingsService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.getFilterGroups();
    this.workoutListingsService = this.allWorkoutListingsService;
    this.workoutConverter = new WorkoutConverter(this.sanitizer);

  }

  get workouts(): Workout[] {
    return this._workouts;
  }

  private getFilterGroups(): void {
    this.cacheService.getWorkoutFilters().subscribe(filters => {
      this.filterGroups = filters;
    });
  }

  public loadByFilter(filters: Array<string>, pageSize: number, offsetId: number): void {
    if (offsetId === -1) {
      this._workouts = [];
      this.counter = 0;
    }
    this.workoutsService.fetchWorkoutsWithSearchCriteria(this.constants, filters, pageSize, offsetId).subscribe(workouts => {

        this.workoutConverter.convertDTOsToWorkouts(workouts).forEach(singleWorkout => {
          this._workouts.push(singleWorkout);
          this.offsetId = singleWorkout.id;
        });
        ++this.counter;
        if (this.counter < this.constants.loadingPattern.length) {
          this.loadByFilter(filters, this.constants.loadingPattern[this.counter], this.offsetId);
        }
      }
    );
  }
}
