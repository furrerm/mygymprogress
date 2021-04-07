import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {TablesComponent} from '../tables.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Exercise} from '../../../core/model/internal-model/exercise.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
  animations: [
    trigger('blendOutTriggerRef', [
      state('dark', style({
        filter: 'brightness(0%)'
      })),
      state('bright', style({
        filter: 'brightness(100%)'
      })),
      transition('bright <=> dark', animate('2000ms linear')),
      transition('dark <=> bright', animate('50ms linear'))
    ]),
  ]
})
export class VideoPlayerComponent implements OnInit, AfterViewInit {

  @Input() videoHandler: TablesComponent;
  @ViewChild('videoPlayer') videoPlayer;

  public videoPanelWidth = 0;
  public videoPanelHeight;
  public videoBlendOutTrigger = 'bright';


  showVideoControls = false;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }
  public setUpVideoPlayer(): void {

    this.videoPanelWidth = this.videoPlayer.nativeElement.offsetWidth;
    this.videoPanelHeight = this.videoPlayer.nativeElement.offsetHeight;

    this.videoHandler.timeCounter = this.videoHandler.currentExercise.timeLength;
    this.playerSettings(this.videoHandler.currentExercise);
    this.changeDetectorRef.detectChanges();
  }

  videoBlendOutCallback(event): void {

    if (this.videoBlendOutTrigger === 'dark') {
      const userEntryRequired = this.videoHandler.currentExercise.userEntryRequired;
      this.videoPlayer.nativeElement.pause();
      if (!userEntryRequired) {
        this.videoHandler.nextExercise();
      } else {
        this.videoHandler.showEntryPanel = true;
        this.videoHandler.fullscreen = false;
      }
    }
  }

  playerSettings(currentExercise: Exercise): void {

    this.videoBlendOutTrigger = 'bright';
    this.videoHandler.showEntryPanel = false;
    const timeToPlay = currentExercise.timeLength * 1000;

    setTimeout(() => {
      this.videoBlendOutTrigger = 'dark';
    }, timeToPlay);
  }

  mouseEnter(): void {
    this.showVideoControls = true;
  }
  mouseLeave(): void {
    this.showVideoControls = false;
  }
}
