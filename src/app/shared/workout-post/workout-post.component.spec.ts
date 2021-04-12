import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutPostComponent } from './workout-post.component';

describe('WorkoutPostComponent', () => {
  let component: WorkoutPostComponent;
  let fixture: ComponentFixture<WorkoutPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
