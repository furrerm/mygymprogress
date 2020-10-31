import {Input, OnChanges, SimpleChanges} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {LastSetServiceService} from './last-set-service.service';
import {Exercise} from '../../saved-workouts.Workout';


@Component({
  selector: 'app-last-set',
  templateUrl: './last-set.component.html',
  styleUrls: ['./last-set.component.css']
})
export class LastSetComponent implements OnInit, OnChanges {
  receivedSets: string;
  updatedExercise: Exercise;
  @Input() currentExercise: Exercise;

  constructor(private lastSetService: LastSetServiceService) {
  }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    this.updatedExercise = null;
    this.updatedExercise = this.currentExercise;
    if (this.updatedExercise) {
      this.updatedExercise.setContainers.sort((a, b) => new Date(b.timeOfExercise).getTime() - new Date(a.timeOfExercise).getTime());
    }
    console.log(this.currentExercise);
  }
}
