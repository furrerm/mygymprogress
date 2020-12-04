import {AfterContentInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {Subject} from 'rxjs';
import {LastSetComponent} from '../last-set/last-set.component';
import {Exercise, ExerciseSet, SetContainer} from '../../saved-workouts.Workout';

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
  private formContro1: FormControl[] = [new FormControl(), new FormControl()];
  private formContro2: FormControl[] = [new FormControl(), new FormControl()];
  form: FormGroup = new FormGroup({
    cities: new FormArray(this.formContro1),
    wei: new FormArray(this.formContro2)
  });

  constructor(private formBuilder: FormBuilder,
              private router: Router) {
    this.sets = new Array();
  }

  ngOnInit() {


  }
  get cities(): FormArray { return this.form.get('cities') as FormArray; }
  get wei(): FormArray { return this.form.get('wei') as FormArray; }
// This does the magic!
  onSubmit(form: FormGroup) {
    // form.controls.name1.value
    // const workoutName: string = form.get('workoutName').value;
    // const exerciseId: number = JSON.parse(JSON.stringify(this.updatedExercise)).id;
    // this.sets.push({id: exerciseId, weight: form.get('weight').value, repetitions: form.get('repetitions').value});
    console.log(this.sets[0].repetitions);
    form.reset();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.changeValue();
  }
  changeValue() {
    this.updatedExercise = null;
    this.updatedExercise = this.currentExercise;
    let arrayLength: number;
    let repetitions: number[];
    let weights: number[];
    if (this.updatedExercise) {
      arrayLength = this.updatedExercise.setsContainer[this.updatedExercise.setsContainer.length - 1].exerciseSets.length;
      repetitions = this.updatedExercise.setsContainer[this.updatedExercise.setsContainer.length - 1].exerciseSets.map(a => a.repetitions);
      weights = this.updatedExercise.setsContainer[this.updatedExercise.setsContainer.length - 1].exerciseSets.map(a => a.weight);
    }
    console.log(this.currentExercise);
    const formControls1: FormControl[] = [];
    const formControls2: FormControl[] = [];
    for (let i = 0; i < arrayLength; i++) {
      formControls1.push(new FormControl());
      formControls2.push(new FormControl());
      // this.cities.push(new FormControl(''));
    }
    // this.form.setControl('cities', new FormArray(formControls));
    // this.form.get('cities').setValue(new FormArray(formControls));
    this.form.patchValue({cities: formControls1});
    this.form.patchValue({wei: formControls2});
    this.form = new FormGroup({
      cities: new FormArray(formControls1),
      wei: new FormArray(formControls2)
    });
    for (let i = 0; i < arrayLength; i++) {
      if (this.cities && this.cities.at(i)) {
        this.wei.at(i).setValue(weights[i]);
        this.cities.at(i).setValue(repetitions[i]);
      }
    }
    console.log(this.cities.at(1));
  }

  removeEntry(position: number) {
    const setContainers: SetContainer[] = this.currentExercise.setsContainer;
    const lastSetContainer: SetContainer = setContainers[setContainers.length - 1];
    lastSetContainer.exerciseSets.splice(position, 1);
    this.changeValue();
  }
  addEntry() {
    const setContainers: SetContainer[] = this.currentExercise.setsContainer;
    const lastSetContainer: SetContainer = setContainers[setContainers.length - 1];
    const lastExerciseSet: ExerciseSet = lastSetContainer.exerciseSets[lastSetContainer.exerciseSets.length - 1];
    lastSetContainer.exerciseSets.push({id: 0, weight: lastExerciseSet.weight, repetitions: lastExerciseSet.repetitions});
    this.changeValue();
  }

  ngOnDestroy(): void {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
  incrementWeight(setPosition: number) {
    ++this.updatedExercise.setsContainer[this.updatedExercise.setsContainer.length - 1].exerciseSets[setPosition].weight;
    this.changeValue();
  }
  decrementWeight(setPosition: number) {
    --this.updatedExercise.setsContainer[this.updatedExercise.setsContainer.length - 1].exerciseSets[setPosition].weight;
    this.changeValue();
  }
  incrementRepetitions(setPosition: number) {
    ++this.updatedExercise.setsContainer[this.updatedExercise.setsContainer.length - 1].exerciseSets[setPosition].repetitions;
    this.changeValue();
  }
  decrementRepetitions(setPosition: number) {
    --this.updatedExercise.setsContainer[this.updatedExercise.setsContainer.length - 1].exerciseSets[setPosition].repetitions;
    this.changeValue();
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
