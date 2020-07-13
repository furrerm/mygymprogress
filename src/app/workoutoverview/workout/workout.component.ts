import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkoutsService} from './workouts.service';
import {ConstantsService} from '../../common/services/constants.service';

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
  workouts: Workout[];
  private isImageLoading: boolean;
  private imageToShow;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private workoutsService: WorkoutsService,
              private constants: ConstantsService) {
    console.log('workout constructor');
  }

  objectToJsonString(obj: Workout) {
    return JSON.stringify(obj);
  }

  ngOnInit() {
    // to clear
    console.log('workout init');
    console.log(this.constants.getUser.id);
    console.log(this.constants.getUser.email);
    console.log(this.constants.getUser.firstSignIn);
    this.route.paramMap.subscribe(params => {
      this.exercise = JSON.parse(params.get('exercise'));
    });
    // to clear end
    this.workoutsService.fetchWorkouts().subscribe(workoutsRes => {
      const workoutsAsJson = JSON.parse(JSON.stringify(workoutsRes));
      console.log(workoutsRes);
      this.workouts = [];
      workoutsAsJson.forEach(x => {
        this.workouts.push({id: x.id, name: x.name, userId: x.userId});
      });
    });

    this.workoutsService.getFiles().subscribe(data => {
        this.createImageFromBlob(data);
        this.isImageLoading = false;
      },
      error => {
        this.isImageLoading = false;
      });
  }
  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load',
      () => {
        this.imageToShow = reader.result;
      },
      false);

    if (image) {
      if (image.type !== 'application/pdf') {
        reader.readAsDataURL(image);
      }
    }
  }

  getIsImageLoading(): boolean {
    return this.isImageLoading;
  }

  getImageToShow() {
    return this.imageToShow;
  }
}

interface Workout {
  id: number;
  name: string;
  userId: number;
}
