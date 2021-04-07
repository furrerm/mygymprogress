import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTopBarComponent } from './video-top-bar.component';

describe('VideoTopBarComponent', () => {
  let component: VideoTopBarComponent;
  let fixture: ComponentFixture<VideoTopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoTopBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
