import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ManagementComponent } from './management.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {LastSetService} from '../workoutoverview/workout/tables/last-set.service';
import {ActivatedRoute, RouterModule} from '@angular/router';

describe('ManagementComponent', () => {
  let component: ManagementComponent;
  let fixture: ComponentFixture<ManagementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementComponent ],
      imports: [
        RouterModule.forRoot([])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoud contain app-menu', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('app-menu')).not.toBeNull();
  });
});
