import {AfterContentInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CurrentSetServiceService} from './current-set-service.service';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {Subject} from 'rxjs';
import {LastSetComponent} from '../last-set/last-set.component';
import {Exercise} from '../../saved-workouts.Workout';

@Component({
  selector: 'app-current-set',
  templateUrl: './current-set.component.html',
  styleUrls: ['./current-set.component.css']
})
export class CurrentSetComponent implements OnInit, OnDestroy, OnChanges {

  sets: Set[];
  updatedExercise: Exercise;
  public destroyed = new Subject<any>();
  mySubscription;
  @Input() currentExercise: Exercise;
  @Input() sibling: LastSetComponent;

  constructor(private formBuilder: FormBuilder,
              private currentSetService: CurrentSetServiceService,
              private router: Router) {
    this.sets = new Array();
  }

  ngOnInit() {
    console.log(this.currentExercise);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updatedExercise = null;
    this.updatedExercise = this.currentExercise;
    if (this.updatedExercise) {
      this.updatedExercise.setContainers.sort((a, b) => new Date(b.timeOfExercise).getTime() - new Date(a.timeOfExercise).getTime());
    }
    console.log(this.currentExercise);
  }

  pushToDB(): void {
    console.log(this.sets);
    console.log(JSON.stringify(this.updatedExercise));
    const exerciseId: number = JSON.parse(JSON.stringify(this.updatedExercise)).id;
    const exerciseName: string = JSON.parse(JSON.stringify(this.updatedExercise)).name;
    const superset: Superset = {id: exerciseId, name: exerciseName, date: 'datum', sets: this.sets};
    console.log(superset);
    console.log(superset.name);
    console.log(superset.date);
    for (const set of superset.sets) {
      console.log(set.weight);
      console.log(set.repetitions);
    }
    this.currentSetService.saveSets(JSON.stringify(superset)).subscribe(a => {
      },
      error => console.log('error'),
      () => {
        // this.sibling.loadLastSet(this.sibling.getValue());
        this.sets = new Array();
      });
  }

  ngOnDestroy(): void {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  onSubmit(form: FormGroup) {
    // form.controls.name1.value
    const exerciseId: number = JSON.parse(JSON.stringify(this.updatedExercise)).id;
    this.sets.push({id: exerciseId, weight: form.get('weight').value, repetitions: form.get('repetitions').value});
    console.log(this.sets[0].repetitions);
    form.reset();
  }
}

interface Superset {
  id: number;
  name: string;
  date: string;
  sets: Set[];
}

interface Set {
  id: number;
  weight: number;
  repetitions: number;
}
