import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WorkoutoverviewComponent } from './workoutoverview.component';

describe('WorkoutoverviewComponent', () => {
  let component: WorkoutoverviewComponent;
  let fixture: ComponentFixture<WorkoutoverviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutoverviewComponent ]
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
