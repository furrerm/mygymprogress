import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WorkoutComponent} from './workout.component';
import {RouterModule} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {WorkoutsService} from './shared/workouts.service';
import {ConstantsService} from '../../core/services/constants.service';
import {SavedWorkoutsService} from './shared/saved-workouts.service';
import {Observable, of} from 'rxjs';
import {Workout} from '../../core/model/internal-model/workout.model';
import {providerDef} from '@angular/compiler/src/view_compiler/provider_compiler';

describe('WorkoutComponent', () => {
  let component: WorkoutComponent;
  let fixture: ComponentFixture<WorkoutComponent>;
  const savedWorkoutsServiceStub = {
    initializeWorkouts() {
      console.log('bal bli bla blu');
    },
    get savedWorkouts(): Observable<Workout[]> {
      return new Observable<Workout[]>();
    }
  };
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WorkoutComponent],
      imports: [
        RouterModule.forRoot([]),
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: SavedWorkoutsService,
          useValue: savedWorkoutsServiceStub
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

