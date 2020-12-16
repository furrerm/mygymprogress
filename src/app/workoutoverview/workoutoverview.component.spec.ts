import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WorkoutoverviewComponent} from './workoutoverview.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {WorkoutpreviewpicturesService} from './workoutpreviewpictures.service';
import {WorkoutpreviewpicturesServiceMock} from './workoutpreviewpictures.service.mock';

describe('WorkoutoverviewComponent', () => {
  let component: WorkoutoverviewComponent;
  let fixture: ComponentFixture<WorkoutoverviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WorkoutoverviewComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        {provide: WorkoutpreviewpicturesService, useClass: WorkoutpreviewpicturesServiceMock}
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
