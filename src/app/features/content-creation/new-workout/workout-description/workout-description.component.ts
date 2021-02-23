import {Component, OnInit} from '@angular/core';
import {SaveWorkoutService} from '../shared/save-workout.service';
import {WorkoutDTO} from '../../../../core/model/swagger-model/workoutDTO';

@Component({
  selector: 'app-workout-description',
  templateUrl: './workout-description.component.html',
  styleUrls: ['./workout-description.component.css']
})
export class WorkoutDescriptionComponent implements OnInit {
  readonly workout: WorkoutDTO = null;
  private answerMessage: string;
  private _workoutTitle: string;

  constructor(private saveWorkoutService: SaveWorkoutService) {
    this.workout = this.saveWorkoutService.workout;
  }

  ngOnInit(): void {
  }

  upload(): void {
    try {
      this.workout.name = this._workoutTitle;
      this.workout.previewImageUrl = this.createImagePath(this.saveWorkoutService.file.name);
      this.workout.savedFromCurrentUser = true;
      this.saveWorkoutService.cacheWorkout(this.workout);
      this.saveWorkoutService.uploadWorkout().subscribe(
        workoutAnswer => {
          this.answerMessage = workoutAnswer;
          this.saveWorkoutService.uploadFile(this.workout.previewImageUrl).subscribe(
            imageAnswer => {
              this.answerMessage = imageAnswer;
            });
        });
    } catch (e) {
      console.log(e);
    }
  }

  private createImagePath(filename: string): string {
    if (filename.includes('.', 1)) {
      const extension = filename.substr(filename.lastIndexOf('.') + 1);
      const basePath = 'resources/' + this.workout.creator.id + '/' + this._workoutTitle;
      const imagePath = basePath + '/' + 'frontimage.' + extension;
      return imagePath;
    } else {
      throw new Error('incorrect image format');
    }
  }

  get workoutTitle(): string {
    return this._workoutTitle;
  }

  set workoutTitle(value: string) {
    this._workoutTitle = value;
  }
}
