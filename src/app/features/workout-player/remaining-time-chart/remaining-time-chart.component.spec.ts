import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemainingTimeChartComponent } from './remaining-time-chart.component';

describe('RemainingTimeChartComponent', () => {
  let component: RemainingTimeChartComponent;
  let fixture: ComponentFixture<RemainingTimeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemainingTimeChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemainingTimeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
