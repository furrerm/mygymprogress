import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisePickerComponent } from './exercise-picker.component';

describe('ExercisePickerComponent', () => {
  let component: ExercisePickerComponent;
  let fixture: ComponentFixture<ExercisePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExercisePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
