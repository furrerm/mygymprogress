import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MusclegroupsComponent } from './musclegroups.component';

describe('MusclegroupsComponent', () => {
  let component: MusclegroupsComponent;
  let fixture: ComponentFixture<MusclegroupsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MusclegroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusclegroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
