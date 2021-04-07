import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoBottomBarComponent } from './video-bottom-bar.component';

describe('VideoBottomBarComponent', () => {
  let component: VideoBottomBarComponent;
  let fixture: ComponentFixture<VideoBottomBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoBottomBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoBottomBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
