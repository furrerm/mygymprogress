import {Component, Input, OnInit} from '@angular/core';
import {Exercise} from '../../../core/model/internal-model/exercise.model';
import {TablesComponent} from '../tables.component';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-next-exercise-preview',
  templateUrl: './next-exercise-preview.component.html',
  styleUrls: ['./next-exercise-preview.component.css']
})
export class NextExercisePreviewComponent implements OnInit {

  @Input() exercises: Exercise[];
  @Input() position: number;
  @Input() tablesComponent: TablesComponent;


  nextExerciseVideo: SafeResourceUrl = null;
  private fileReader = new FileReader();

  constructor(readonly sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.setVideoSrc();
  }

  setVideoSrc(): void {
    this.tablesComponent.getNextExercise().videoSrc.subscribe(videoUrl => {
      if (videoUrl !== null) {
        this.nextExerciseVideo = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(videoUrl));
        // this.changeDetectorRef.detectChanges();
        this.fileReader.readAsDataURL(videoUrl);

      }
    });
  }
  nextExercise(): void {
    this.tablesComponent.nextExercise();
  }
}
