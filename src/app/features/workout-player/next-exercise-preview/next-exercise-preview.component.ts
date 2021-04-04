import {Component, Input, OnInit} from '@angular/core';
import {Exercise} from '../../../core/model/internal-model/exercise.model';

@Component({
  selector: 'app-next-exercise-preview',
  templateUrl: './next-exercise-preview.component.html',
  styleUrls: ['./next-exercise-preview.component.css']
})
export class NextExercisePreviewComponent implements OnInit {

  @Input() exercises: Exercise[];
  @Input() position: number;

  constructor() { }

  ngOnInit(): void {
  }
}
