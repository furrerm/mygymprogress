import {Component, Injectable, OnInit, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkoutsService} from './shared/workouts.service';
import {ConstantsService} from '../../core/services/constants.service';
import {WorkoutOverviewPicturesService} from '../workoutoverview/shared/workout-overview-pictures.service';
import {SavedWorkoutsService} from './shared/saved-workouts.service';
import {WorkoutListing} from './workout-listing';
import {Workout} from '../../core/model/internal-model/workout.model';
import {WorkoutConverter} from '../../core/model/converter/workout-converter';
import {WorkoutDTO} from '../../core/model/swagger-model/workoutDTO';
import {SavedWorkoutDTO} from '../../core/model/swagger-model/savedWorkoutDTO';
import {WorkoutListingsInterface} from './shared/workout-listings-interface';
import {AllWorkoutListingsService} from './shared/all-workout-listings.service';
import {DayDTO} from '../../core/model/swagger-model/dayDTO';
import {Day} from '../../core/model/internal-model/day.model';
import {CacheService} from '../../core/services/cache.service';
import { FilterGroupDTO } from 'src/app/core/model/swagger-model/filterGroupDTO';

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
  private _workoutListings: WorkoutListing[];
  private inSavedWorkouts: boolean;

  bntStyle = 'btn-default';

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
    private savedWorkoutsService: SavedWorkoutsService,
    private allWorkoutListingsSerivce: AllWorkoutListingsService
  ) {
  }

  ngOnInit(): void {
    this.cacheService.getFilters().subscribe(filters => {
      this.filterGroups = filters;
    });

    this.route.queryParamMap.subscribe(params => {
      if (params.get('criteria') == null) {
        this.inSavedWorkouts = true;
        this.workoutListingsService = this.savedWorkoutsService;
      } else {
        this.workoutListingsService = this.allWorkoutListingsSerivce;
      }
    });


    this.workoutListingsService.savedWorkouts().subscribe(workouts =>
      this._workoutListings = workouts.map(a => ({
          workout: a,
          isCollapsed: true,
          toggleImage: '../../assets/pictures/menuButtons/toggle_open.png'
        })
      ));


    this._workoutListings.forEach(a => a.isCollapsed = true);
  }

  expandContent(set: WorkoutListing): void {
    set.isCollapsed = !set.isCollapsed;
    if (set.isCollapsed) {
      set.toggleImage = '../../assets/pictures/menuButtons/toggle_open.png';
    } else {
      set.toggleImage = '../../assets/pictures/menuButtons/toggle_close.png';
    }
    this.bntStyle = 'btn-default2';
  }

  get workoutListings(): WorkoutListing[] {
    return this._workoutListings;
  }

  likeWorkout(workout: Workout): void {
    if (workout.isSavedFromCurrentUser !== true) {
      workout.isSavedFromCurrentUser = true;
      this.savedWorkoutsService.addWorkout(workout);
    } else {
      workout.isSavedFromCurrentUser = false;
      this.savedWorkoutsService.remove(workout);
    }
    if (this.inSavedWorkouts && !workout.isSavedFromCurrentUser) {
      this._workoutListings = this._workoutListings.filter(a => a.workout.id !== workout.id);
    }

    const savedWorkout: SavedWorkoutDTO = {userId: this.constants.getUser.id, workoutId: workout.id};
    this.workoutsService.likeWorkout(savedWorkout).subscribe(likeAnswer => {
      console.log(likeAnswer);
    });
  }

  likeButtonImage(isLiked: boolean): string {
    return isLiked ? 'assets/pictures/menuButtons/like_active.svg' : 'assets/pictures/menuButtons/like_inactive.svg';
  }

  playDayWorkout(day: Day): void {
    this.workoutsService.cacheWorkoutDayToPlay(day);
    this.router.navigate(['tables/1/1'], { relativeTo: this.route });
  }
  filterDivExpanded(expanded: boolean): void {
    this.filterExpanded = expanded;
  }
}
