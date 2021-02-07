import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {TablesComponent} from './tables.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {SavedWorkoutsService} from '../workout-list/shared/saved-workouts.service';
import {BehaviorSubject, Observable, of} from 'rxjs';

import {Workout} from '../../core/model/internal-model/workout.model';

import {DayDTO} from '../../core/model/swagger-model/dayDTO';
import {LastSetService} from './shared/last-set.service';
import {ExerciseDTO} from '../../core/model/swagger-model/exerciseDTO';
import {ExerciseSetContainerDTO} from '../../core/model/swagger-model/exerciseSetContainerDTO';
import {ExerciseSetDTO} from '../../core/model/swagger-model/exerciseSetDTO';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {PhaseDTO} from '../../core/model/swagger-model/phaseDTO';

class LastSetServiceMock extends LastSetService {
  getSets(exerciseIds: number[]): Observable<ExerciseDTO[]> {
    const exerciseSetDTOs: ExerciseSetDTO[] = [{
      id: 1,
      weight: 12,
      repetitions: 15
    }];
    const exerciseSetContainerDTOs: ExerciseSetContainerDTO[] = [{
      timeOfExercise: new Date(Date.now()),
      exerciseSets: exerciseSetDTOs
    }];
    const exerciseDTOs: ExerciseDTO[] = [{
      id: 1,
      name: 'exercise1',
      setsContainer: exerciseSetContainerDTOs,
      order: 1
    }];
    return of(exerciseDTOs);
  }
}

class SavedWorkoutsServiceMock extends SavedWorkoutsService {
  readonly _savedWorkouts: BehaviorSubject<Workout[]>;
  public get savedWorkouts(): BehaviorSubject<Workout[]> {
    return this._savedWorkouts;
  }

  public initializeWorkouts(): void {
    const phaseDTOs: PhaseDTO[] = [{
      id: 1,
      name: 'phase1',
      exercises: [],
      order: 1
    }];
    const days: DayDTO[] = [{
      id: 1,
      name: 'monday',
      phases: phaseDTOs
    }];
    const savedWorkouts: Workout[] = [{
      id: 1,
      name: 'workout1',
      imageUrl: '',
      creatorId: 0,
      image: 'string',
      days
    }];
    this.savedWorkouts.next(savedWorkouts);
  }
}

describe('TablesComponent', () => {
  let component: TablesComponent;
  let fixture: ComponentFixture<TablesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TablesComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        {provide: SavedWorkoutsService, useClass: SavedWorkoutsServiceMock},
        {provide: LastSetService, useClass: LastSetServiceMock},
        {
          provide: ActivatedRoute,
          useValue: {paramMap: of(convertToParamMap({savedWorkoutId: 1, dayId: 1}))}
        }
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
      fixture = TestBed.createComponent(TablesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


