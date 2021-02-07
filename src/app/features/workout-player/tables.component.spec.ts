import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {TablesComponent} from './tables.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {SavedWorkoutsService} from '../workout-list/shared/saved-workouts.service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {WorkoutsService} from '../workout-list/shared/workouts.service';
import {ConstantsService} from '../../core/services/constants.service';
import {HttpClient} from '@angular/common/http';
import {WorkoutpreviewpicturesService} from '../workoutoverview/shared/workoutpreviewpictures.service';
import {Workout} from '../../core/model/internal-model/workout.model';
import {AfterContentInit, Injectable, OnInit} from '@angular/core';
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
  public savedWorkouts: BehaviorSubject<Workout[]>;

  public initializeWorkouts() {
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
      isCollapsed: true,
      days,
      toggleImage: 'toggled'
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


