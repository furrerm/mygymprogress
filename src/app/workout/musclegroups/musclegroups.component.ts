import {Component, OnInit} from '@angular/core';
import {MusclegroupsService} from './musclegroups.service';

@Component({
  selector: 'app-musclegroups',
  templateUrl: './musclegroups.component.html',
  styleUrls: ['./musclegroups.component.css']
})
export class MusclegroupsComponent implements OnInit {
  exerciseGroups: ExerciseGroup[];
  group: string;

  constructor(private musclgroupservice: MusclegroupsService) {
  }

  ngOnInit() {
    this.musclgroupservice.fetchExerciseGroups().subscribe(winningsLoc => {
      const exerciseGroups = JSON.parse(JSON.stringify(winningsLoc));
      this.exerciseGroups = [];
      exerciseGroups.forEach(x => {
        this.exerciseGroups.push({label: x.name, exercises: x.exercises});
      });
    });
  }

  showExercises(exerciseGroup: ExerciseGroup) {
    this.group = exerciseGroup.label;
  }

  makeString(param: string) {
    return JSON.stringify(param);
  }
}

interface ExerciseGroup {
  label: string;
  exercises: string[];
}
