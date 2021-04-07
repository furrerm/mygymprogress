import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {WorkoutMock} from '../WorkoutMock';
import {Exercise} from '../../../core/model/internal-model/exercise.model';

@Component({
  selector: 'app-video-top-bar',
  templateUrl: './video-top-bar.component.html',
  styleUrls: ['./video-top-bar.component.css']
})
export class VideoTopBarComponent implements OnInit {

  workoutMock: WorkoutMock;
  currentExercise: Exercise;

  constructor(private sanitizer: DomSanitizer) {
    this.workoutMock = new WorkoutMock(sanitizer);
    this.currentExercise = this.workoutMock.day.phases[0].exercises[0];
  }

  ngOnInit(): void {
  }

}
