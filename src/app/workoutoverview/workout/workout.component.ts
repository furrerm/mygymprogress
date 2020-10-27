import {Component, Injectable, OnInit, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkoutsService} from './workouts.service';
import {ConstantsService} from '../../common/services/constants.service';
import {WorkoutpreviewpicturesService} from './../workoutpreviewpictures.service';
import {ImageObservable} from '../workoutoverview.component';
import {SavedWorkouts} from './saved-workouts.Workout';
import {SavedWorkoutsService} from './saved-workouts.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
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

  objectToJsonString(obj: SavedWorkouts) {
    return JSON.stringify(obj);
  }

  ngOnInit() {
    this.workoutsService.fetchWorkouts().subscribe(data => {
      this.workouts = this.savedWorkoutsService.convertJsonDataToWorkouts(data);
      this.savedWorkoutsService.setSavedWorkouts = this.workouts;
      for (const i in data) {
        if (data.hasOwnProperty(i)) {
          console.log(data[i]);
          this.workoutpreviewpicturesService.getFiles(i, data[i].imageUrl).image.subscribe(data2 => {
            this.addImagesToWorkouts(data2, i);
          });
        }
      }
    });
  }

  addImagesToWorkouts(image: Blob, position) {
    const reader = new FileReader();
    reader.addEventListener('load',
      () => {
        this.workouts[position].image = reader.result;
        this.workouts[position].isImageLoaded = true;
        this.savedWorkoutsService.getSavedWorkouts[position].image = reader.result;
        this.savedWorkoutsService.getSavedWorkouts[position].isImageLoaded = true;
      },
      false);
    if (image) {
      if (image.type !== 'application/pdf') {
        reader.readAsDataURL(image);
      }
    }
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
}
