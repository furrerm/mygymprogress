import {Component, Injectable, OnInit, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkoutsService} from './shared/workouts.service';
import {ConstantsService} from '../../core/services/constants.service';
import {WorkoutpreviewpicturesService} from '../workoutoverview/shared/workoutpreviewpictures.service';
import {ImageObservable} from '../workoutoverview/workoutoverview.component';
import {SavedWorkouts} from './shared/saved-workouts.model';
import {SavedWorkoutsService} from './shared/saved-workouts.service';
import {Observable} from 'rxjs';

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
  private isImageLoading: boolean;
  private imageToShow;
  private previewImagesObservables: ImageObservable[] = [];
  private workouts: SavedWorkouts[];

  bntStyle = 'btn-default';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private workoutsService: WorkoutsService,
              private constants: ConstantsService,
              private workoutpreviewpicturesService: WorkoutpreviewpicturesService,
              private el: ElementRef,
              private savedWorkoutsService: SavedWorkoutsService) {
    console.log('workout constructor');
  }

  ngOnInit() {
    this.savedWorkoutsService.getSavedWorkouts.subscribe(data =>
      this.workouts = data
    );
    this.savedWorkoutsService.initializeWorkouts();
    console.log(this.workouts);
  }

  convert() {

  }

  expandContent(set: SavedWorkouts) {
    set.isCollapsed = !set.isCollapsed;
    if (set.isCollapsed) {
      set.toggleImage = '../../assets/pictures/menuButtons/toggle_open.png';
    } else {
      set.toggleImage = '../../assets/pictures/menuButtons/toggle_close.png';
    }
    console.log(this.bntStyle);
    console.log('something expanded');
    this.bntStyle = 'btn-default2';
    console.log(this.bntStyle);
    console.log(this.el.nativeElement.offsetHeight);
  }

  foo(num: number) {
    console.log(num);
  }
  getWorkouts() {
    return this.workouts;
  }
}
