import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {TablesComponent} from './tables.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BehaviorSubject, Observable, of} from 'rxjs';

import {Workout} from '../../core/model/internal-model/workout.model';

import {LastSetService} from './shared/last-set.service';

import {ActivatedRoute, convertToParamMap} from '@angular/router';


describe('TablesComponent', () => {
  let component: TablesComponent;
  let fixture: ComponentFixture<TablesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TablesComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        {provide: LastSetService},
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


