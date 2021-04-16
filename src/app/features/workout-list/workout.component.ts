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
  private _workouts: Workout[];


  private workoutListingsService: WorkoutListingsInterface;

  filterGroups: FilterGroupDTO[] = [];
  filterExpanded = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workoutsService: WorkoutsService,
    private constants: ConstantsService,
    private cacheService: CacheService,
    private workoutOverviewPicturesService: WorkoutOverviewPicturesService,
    private el: ElementRef,
    private allWorkoutListingsService: AllWorkoutListingsService
  ) {
  }

  ngOnInit(): void {
    this.getFilterGroups();
    this.workoutListingsService = this.allWorkoutListingsService;


  }

  get workouts(): Workout[] {
    return this._workouts;
  }

  private getFilterGroups(): void {
    this.cacheService.getWorkoutFilters().subscribe(filters => {
      this.filterGroups = filters;
    });
  }

  public loadByFilter(filters: Array<string>): void {
    this.workoutListingsService.savedWorkouts(filters).subscribe(workouts => {
        this._workouts = workouts;
      }
    );
  }
}
