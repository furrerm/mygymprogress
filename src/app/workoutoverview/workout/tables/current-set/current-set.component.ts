import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {LastSetComponent} from '../last-set/last-set.component';
import {ExerciseDTO} from '../../../../common/model/swagger-model/exerciseDTO';
import {ExerciseSetContainerDTO} from '../../../../common/model/swagger-model/exerciseSetContainerDTO';
import {ExerciseSetDTO} from '../../../../common/model/swagger-model/exerciseSetDTO';

@Component({
  selector: 'app-current-set',
  templateUrl: './current-set.component.html',
  styleUrls: ['./current-set.component.css']
})
export class CurrentSetComponent implements OnInit, OnChanges {

  @Input() currentExercise: ExerciseDTO;
  form: FormGroup = new FormGroup({
    repetitions: new FormArray([new FormControl()]),
    weights: new FormArray([new FormControl()])
  });

  constructor() {
  }

  ngOnInit() {
  }

  get repetitions(): FormArray {
    return this.form.get('repetitions') as FormArray;
  }

  get weights(): FormArray {
    return this.form.get('weights') as FormArray;
  }

  onSubmit(form: FormGroup) {
    form.reset();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.changeValue();
  }

  changeValue() {


    this.form = this.initializeTheForm();
  }

  private initializeTheForm() {

    if (this.currentExercise) {
      const setLength = this.currentExercise.setsContainer[this.currentExercise.setsContainer.length - 1].exerciseSets.length;

      const formControls1: FormControl[] = [];
      const formControls2: FormControl[] = [];
      for (let i = 0; i < setLength; i++) {
        formControls1.push(new FormControl());
        formControls2.push(new FormControl());
      }
      const formGroup: FormGroup = new FormGroup({
        repetitions: new FormArray(formControls1),
        weights: new FormArray(formControls2)
      });
      return this.setTheFormValues(setLength, formGroup);
    } else {
      return new FormGroup({
        repetitions: new FormArray([new FormControl()]),
        weights: new FormArray([new FormControl()])
      });
    }
  }


  private setTheFormValues(setLength: number, formGroup: FormGroup) {

    const lastSetContainerId = this.currentExercise.setsContainer.length - 1;
    const repetitions = this.currentExercise.setsContainer[lastSetContainerId].exerciseSets.map(a => a.repetitions);
    const weights = this.currentExercise.setsContainer[lastSetContainerId].exerciseSets.map(a => a.weight);

    const repetitionsFormArray: FormArray = formGroup.get('repetitions') as FormArray;
    const weightsFormArray: FormArray = formGroup.get('weights') as FormArray;

    for (let i = 0; i < setLength; i++) {
      if (repetitionsFormArray && repetitionsFormArray.at(i)) {
        repetitionsFormArray.at(i).setValue(repetitions[i]);
        weightsFormArray.at(i).setValue(weights[i]);
      }
    }
    return formGroup;
  }

  removeEntry(position: number) {
    const setContainers: ExerciseSetContainerDTO[] = this.currentExercise.setsContainer;
    const lastSetContainer: ExerciseSetContainerDTO = setContainers[setContainers.length - 1];
    lastSetContainer.exerciseSets.splice(position, 1);
    this.changeValue();
  }

  addEntry() {
    const setContainers: ExerciseSetContainerDTO[] = this.currentExercise.setsContainer;
    const lastSetContainer: ExerciseSetContainerDTO = setContainers[setContainers.length - 1];
    const lastExerciseSet: ExerciseSetDTO = lastSetContainer.exerciseSets[lastSetContainer.exerciseSets.length - 1];
    lastSetContainer.exerciseSets.push({id: 0, weight: lastExerciseSet.weight, repetitions: lastExerciseSet.repetitions});
    this.changeValue();
  }

  incrementWeight(setPosition: number) {
    ++this.currentExercise.setsContainer[this.currentExercise.setsContainer.length - 1].exerciseSets[setPosition].weight;
    this.changeValue();
  }

  decrementWeight(setPosition: number) {
    --this.currentExercise.setsContainer[this.currentExercise.setsContainer.length - 1].exerciseSets[setPosition].weight;
    this.changeValue();
  }

  incrementRepetitions(setPosition: number) {
    ++this.currentExercise.setsContainer[this.currentExercise.setsContainer.length - 1].exerciseSets[setPosition].repetitions;
    this.changeValue();
  }

  decrementRepetitions(setPosition: number) {
    --this.currentExercise.setsContainer[this.currentExercise.setsContainer.length - 1].exerciseSets[setPosition].repetitions;
    this.changeValue();
  }
}
