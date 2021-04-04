import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutPositionChartComponent } from './workout-position-chart.component';

describe('WorkoutPositionChartComponent', () => {
  let component: WorkoutPositionChartComponent;
  let fixture: ComponentFixture<WorkoutPositionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutPositionChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutPositionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
