import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WorkoutoverviewComponent} from './workoutoverview.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {WorkoutOverviewPicturesService} from './shared/workout-overview-pictures.service';
import {WorkoutOverviewPicturesServiceMock} from './shared/workout-overview-pictures.service.mock';

describe('WorkoutoverviewComponent', () => {
  let component: WorkoutoverviewComponent;
  let fixture: ComponentFixture<WorkoutoverviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WorkoutoverviewComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        {provide: WorkoutOverviewPicturesService, useClass: WorkoutOverviewPicturesServiceMock}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
