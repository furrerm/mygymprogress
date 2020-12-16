import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LastSetComponent } from './last-set.component';

describe('LastSetComponent', () => {
  let component: LastSetComponent;
  let fixture: ComponentFixture<LastSetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LastSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
