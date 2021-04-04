import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextExercisePreviewComponent } from './exercise-position.component';

describe('ExercisePositionComponent', () => {
  let component: NextExercisePreviewComponent;
  let fixture: ComponentFixture<NextExercisePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextExercisePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextExercisePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
