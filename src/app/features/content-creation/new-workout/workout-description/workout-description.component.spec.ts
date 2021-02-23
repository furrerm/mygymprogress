import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutDescriptionComponent } from './workout-description.component';

describe('WorkoutDescriptionComponent', () => {
  let component: WorkoutDescriptionComponent;
  let fixture: ComponentFixture<WorkoutDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
