import {Component, Input, OnInit, Output, SimpleChanges, EventEmitter, OnChanges} from '@angular/core';
import {ExerciseDTO} from '../../../core/model/swagger-model/exerciseDTO';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {ExerciseSetContainerDTO} from '../../../core/model/swagger-model/exerciseSetContainerDTO';
import {ExerciseSetDTO} from '../../../core/model/swagger-model/exerciseSetDTO';

@Component({
  selector: 'app-entry-panel',
  templateUrl: './entry-panel.component.html',
  styleUrls: ['./entry-panel.component.css']
})
export class EntryPanelComponent implements OnInit, OnChanges {

  @Input() currentExercise: ExerciseDTO;
  @Output() currentExerciseEvent = new EventEmitter<ExerciseDTO>();
  form: FormGroup = new FormGroup({
    repetitions: new FormArray([new FormControl()]),
    weights: new FormArray([new FormControl()])
  });

  constructor() {
  }

  ngOnInit(): void {
  }

  exerciseType(): EXERCISE_TYPE {
    if (this.currentExercise.weight === true && this.currentExercise.timeBased === false) {
      return EXERCISE_TYPE.RepsAndWeight;
    } else if (this.currentExercise.weight === true && this.currentExercise.timeBased === true) {
      return EXERCISE_TYPE.TimeAndWeight;
    } else if (this.currentExercise.weight === false && this.currentExercise.timeBased === true) {
      return EXERCISE_TYPE.OnlyTime;
    } else if (this.currentExercise.weight === false && this.currentExercise.timeBased === false) {
      return EXERCISE_TYPE.OnlyReps;
    }
  }

  get repetitions(): FormArray {
    return this.form.get('repetitions') as FormArray;
  }

  get weights(): FormArray {
    return this.form.get('weights') as FormArray;
  }

  onSubmit(form: FormGroup): void {
    form.reset();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.changeInput();
  }

  changeOutput(): void {
    this.currentExerciseEvent.emit({...this.currentExercise});
  }

  changeInput(): void {

    this.form = this.initializeTheForm();
  }

  private initializeTheForm(): FormGroup {

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


  private setTheFormValues(setLength: number, formGroup: FormGroup): FormGroup {

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

  removeEntry(position: number): void {
    const setContainers: ExerciseSetContainerDTO[] = this.currentExercise.setsContainer;
    const lastSetContainer: ExerciseSetContainerDTO = setContainers[setContainers.length - 1];
    lastSetContainer.exerciseSets.splice(position, 1);
    this.changeInput();
    this.changeOutput();
  }

  addEntry(): void {
    const setContainers: ExerciseSetContainerDTO[] = this.currentExercise.setsContainer;
    const lastSetContainer: ExerciseSetContainerDTO = setContainers[setContainers.length - 1];
    const lastExerciseSet: ExerciseSetDTO = lastSetContainer.exerciseSets[lastSetContainer.exerciseSets.length - 1];
    lastSetContainer.exerciseSets.push({id: 0, weight: lastExerciseSet.weight, repetitions: lastExerciseSet.repetitions});
    this.changeInput();
    this.changeOutput();
  }

  incrementWeight(setPosition: number): void {
    ++this.currentExercise.setsContainer[this.currentExercise.setsContainer.length - 1].exerciseSets[setPosition].weight;
    this.changeInput();
    this.changeOutput();
  }

  decrementWeight(setPosition: number): void {
    --this.currentExercise.setsContainer[this.currentExercise.setsContainer.length - 1].exerciseSets[setPosition].weight;
    this.changeInput();
    this.changeOutput();
  }

  incrementRepetitions(setPosition: number): void {
    ++this.currentExercise.setsContainer[this.currentExercise.setsContainer.length - 1].exerciseSets[setPosition].repetitions;
    this.changeInput();
    this.changeOutput();
  }

  decrementRepetitions(setPosition: number): void {
    --this.currentExercise.setsContainer[this.currentExercise.setsContainer.length - 1].exerciseSets[setPosition].repetitions;
    this.changeInput();
    this.changeOutput();
  }

  public get EXERCISE_TYPE(): typeof EXERCISE_TYPE {
    return EXERCISE_TYPE;
  }
}

export enum EXERCISE_TYPE {
  OnlyTime,
  OnlyReps,
  TimeAndWeight,
  RepsAndWeight
}


