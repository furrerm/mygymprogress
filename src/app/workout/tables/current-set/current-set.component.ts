import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CurrentSetServiceService} from './current-set-service.service';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-current-set',
  templateUrl: './current-set.component.html',
  styleUrls: ['./current-set.component.css']
})
export class CurrentSetComponent implements OnInit, OnDestroy {
  myForm: FormGroup;
  sets: Set[];
  updatedExercise: string;
  public destroyed = new Subject<any>();
  mySubscription;

  @Input() set exercise(value: string) {
    this.updatedExercise = value;
  }

  constructor(private formBuilder: FormBuilder, private currentSetService: CurrentSetServiceService, private router: Router) {
    this.sets = new Array();
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      name1: '',
      repetitions: ''
    });

    this.onChanges();
  }

  onChanges(): void {
  }



  pushToDB(): void {
    console.log(this.sets);
    const exerciseName: string = JSON.parse(JSON.stringify(this.updatedExercise)).name;
    const superset: Superset = {name: exerciseName, date: 'datum', sets: this.sets};
    console.log(superset);
    console.log(superset.name);
    console.log(superset.date);
    for (const set of superset.sets) {
      console.log(set.weight);
      console.log(set.repetitions);
    }
    this.currentSetService.saveSets(JSON.stringify(superset)).subscribe(a => { },
      error => console.log('error'),
      () => window.location.reload());
  }
  ngOnDestroy(): void {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
  onSubmit(form: FormGroup) {
    // form.controls.name1.value
    const exerciseId: number = JSON.parse(JSON.stringify(this.updatedExercise)).id;
    this.sets.push({id: exerciseId, weight: form.get('name1').value, repetitions: form.get('repetitions').value});
    console.log(this.sets[0].repetitions);
    form.reset();
  }
}

interface Superset {
  name: string;
  date: string;
  sets: Set[];
}

interface Set {
  id: number;
  weight: number;
  repetitions: number;
}
