import {Component, ElementRef, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConstantsService} from '../../core/services/constants.service';
import {WorkoutOverviewPicturesService} from './shared/workout-overview-pictures.service';
import {Observable} from 'rxjs';
import {SavedWorkoutsService} from '../workout-list/shared/saved-workouts.service';
import {SaveWorkoutService} from '../content-creation/new-workout/shared/save-workout.service';

@Component({
  selector: 'app-workoutoverview',
  templateUrl: './workoutoverview.component.html',
  styleUrls: ['./workoutoverview.component.css']
})
export class WorkoutoverviewComponent implements AfterViewInit, OnInit {

  private previewImagesObservables: ImageObservable[] = new Array(4);
  private _previewImages: PreviewImage[] = new Array(4);

  @ViewChild('content', {static: true}) elementView: ElementRef;
  @ViewChild('menu', {static: true}) menuView: ElementRef;
  constructor(private route: ActivatedRoute,
              private workoutpreviewpicturesService: WorkoutOverviewPicturesService,
              private constants: ConstantsService,
              private saveWorkoutService: SaveWorkoutService
  ) {
    this.saveWorkoutService.clearCache();
  }

  ngOnInit(): void {
    this.workoutpreviewpicturesService.getUrls().subscribe( data => {
      for (const i in data) {
        if (data.hasOwnProperty(i)) {
          this.workoutpreviewpicturesService.getFiles(Number(i), data[i], this.constants).image.subscribe(data2 => {
              this.createImageFromBlob(data2, i);
            });
        }
      }
    });
  }

  ngAfterViewInit(): void {
  }

  get previewImages(): PreviewImage[] {
    return this._previewImages;
  }

  createImageFromBlob(image: Blob, position): void {
    const reader = new FileReader();
    reader.addEventListener('load',
      () => {
        this.previewImages[position] = { image: reader.result, isLoaded: true };
      },
      false);
    if (image) {
      if (image.type !== 'application/pdf') {
        reader.readAsDataURL(image);
      }
    }
  }
}
// todo: image observabe should take care of id from workout and not position
export interface ImageObservable {
  image: Observable<File>;
  position: number;
}
export interface PreviewImage {
  image: string | ArrayBuffer;
  isLoaded: boolean;
}
