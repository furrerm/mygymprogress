import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CurrentSetComponent } from './current-set.component';
import {ExerciseDTO} from '../../../core/model/swagger-model/exerciseDTO';
import {ExerciseSetContainerDTO} from '../../../core/model/swagger-model/exerciseSetContainerDTO';
import {ExerciseSetDTO} from '../../../core/model/swagger-model/exerciseSetDTO';
import {AppComponent} from '../../../app.component';

describe('CurrentSetComponent', () => {
  let component: CurrentSetComponent;
  let fixture: ComponentFixture<CurrentSetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentSetComponent);
    component = fixture.componentInstance;
    const exerciseSets: ExerciseSetDTO[] = [
      {id: 1, weight: 30, repetitions: 12},
      {id: 2, weight: 31, repetitions: 11},
      {id: 3, weight: 32, repetitions: 10},
      {id: 4, weight: 33, repetitions: 9}
    ];
    const setsContainer: ExerciseSetContainerDTO[] = [
      {timeOfExercise: new Date(Date.now()), exerciseSets},
      {timeOfExercise: new Date(Date.now() - 20), exerciseSets},
      {timeOfExercise: new Date(Date.now() - 30), exerciseSets},
      ];
    const currentExerciseDTO: ExerciseDTO = {id: 1, name: 'pull up', setsContainer, order: 1};
    component.currentExercise = currentExerciseDTO;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a form', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('form > .inputFieldsRowWrapper')).not.toBeNull();
  });
});
