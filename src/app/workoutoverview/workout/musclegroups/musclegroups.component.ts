import {Component, OnInit} from '@angular/core';
import {MusclegroupsService} from './musclegroups.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-musclegroups',
  templateUrl: './musclegroups.component.html',
  styleUrls: ['./musclegroups.component.css']
})
export class MusclegroupsComponent implements OnInit {
  exerciseGroups: ExerciseGroup[];
  group: string;
  workout: string;

  constructor(private musclgroupservice: MusclegroupsService, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      console.log(params.get('workout'));
      console.log(JSON.parse(params.get('workout')));
      // console.log('rout param = ' + params.get('exercise'));
      // this.workout = JSON.parse(params.get('workout'));
      this.workout = params.get('workout');
      this.musclgroupservice.fetchExerciseGroups(this.workout).subscribe(winningsLoc => {
        const exerciseGroups = JSON.parse(JSON.stringify(winningsLoc));
        console.log(winningsLoc);
        this.exerciseGroups = [];
        exerciseGroups.forEach(x => {
          this.exerciseGroups.push({label: x.name, exercises: x.exercises});
        });
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
