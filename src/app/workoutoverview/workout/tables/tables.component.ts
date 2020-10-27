import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CurrentSetComponent} from './current-set/current-set.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SavedWorkoutsService} from '../saved-workouts.service';
import {SavedWorkouts} from '../saved-workouts.Workout';
import {WorkoutsService} from '../workouts.service';
import {WorkoutpreviewpicturesService} from '../../workoutpreviewpictures.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit {
  // @ViewChild(CurrentSetComponent, {static: true}) child: CurrentSetComponent;
  exercise: string;
  private workout: SavedWorkouts[] = [];
  constructor(private route: ActivatedRoute,
              private workoutsService: WorkoutsService,
              private workoutpreviewpicturesService: WorkoutpreviewpicturesService,
              private savedWorkoutService: SavedWorkoutsService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log('route param = ' + params.get('exercise'));
    });
    if (this.savedWorkoutService.getSavedWorkouts) {
      this.workout = this.savedWorkoutService.getSavedWorkouts;
    } else {
      this.workoutsService.fetchWorkouts().subscribe(data => {
        this.workout = this.savedWorkoutService.convertJsonDataToWorkouts(data);
      });
    }
  }
}
