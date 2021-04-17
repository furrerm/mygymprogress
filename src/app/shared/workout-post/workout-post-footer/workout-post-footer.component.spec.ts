import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutPostFooterComponent } from './workout-post-footer.component';

describe('WorkoutPostFooterComponent', () => {
  let component: WorkoutPostFooterComponent;
  let fixture: ComponentFixture<WorkoutPostFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutPostFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutPostFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
