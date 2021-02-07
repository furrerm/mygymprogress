import {Component, Injectable, OnInit, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkoutsService} from './shared/workouts.service';
import {ConstantsService} from '../../core/services/constants.service';
import {WorkoutOverviewPicturesService} from '../workoutoverview/shared/workout-overview-pictures.service';
import {SavedWorkoutsService} from './shared/saved-workouts.service';
import {WorkoutListing} from './workout-listing';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css', '../../shared/shared.style.css']
})
export class WorkoutComponent implements OnInit {
  exercise: string;
  private _workoutListings: WorkoutListing[];

  bntStyle = 'btn-default';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private workoutsService: WorkoutsService,
              private constants: ConstantsService,
              private workoutOverviewPicturesService: WorkoutOverviewPicturesService,
              private el: ElementRef,
              private savedWorkoutsService: SavedWorkoutsService) {
  }

  ngOnInit(): void {
    this.savedWorkoutsService.savedWorkouts.subscribe(workouts =>
      this._workoutListings = workouts.map(a => ({workout: a, isCollapsed: true, toggleImage: '../../assets/pictures/menuButtons/toggle_open.png'})
    ));
    this.savedWorkoutsService.initializeWorkouts();
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
}
