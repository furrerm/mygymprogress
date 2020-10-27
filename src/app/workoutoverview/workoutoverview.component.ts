import {Component, ElementRef, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkoutsService} from './workout/workouts.service';
import {ConstantsService} from '../common/services/constants.service';
import {WorkoutpreviewpicturesService} from './workoutpreviewpictures.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-workoutoverview',
  templateUrl: './workoutoverview.component.html',
  styleUrls: ['./workoutoverview.component.css']
})
export class WorkoutoverviewComponent implements AfterViewInit, OnInit {

  private isImageLoading: boolean;
  private imageToShow;
  private previewImagesObservables: ImageObservable[] = new Array(4);
  private previewImages: PreviewImage[] = new Array(4);

  @ViewChild('content', {static: true}) elementView: ElementRef;
  @ViewChild('menu', {static: true}) menuView: ElementRef;
  constructor(private route: ActivatedRoute,
              private workoutpreviewpicturesService: WorkoutpreviewpicturesService,
              private constants: ConstantsService) { }

  ngOnInit() {
    console.log('in init');
    this.workoutpreviewpicturesService.getUrls().subscribe( data => {
      console.log(data);
      console.log(data[0]);
      console.log(data[1]);
      for (const i in data) {
        if (data.hasOwnProperty(i)) {
          console.log(data[i]);
          this.workoutpreviewpicturesService.getFiles(i, data[i]).image.subscribe(data2 => {
              this.createImageFromBlob(data2, i);
            },
            error => {
              this.isImageLoading = true;
            });
        }
      }
    });
  }

  ngAfterViewInit() {
  }
  getIsImageLoading(): boolean {
    return this.isImageLoading;
  }

  getImageToShow() {
    return this.previewImages;
  }

  createImageFromBlob(image: Blob, position) {
    const reader = new FileReader();
    reader.addEventListener('load',
      () => {
        this.imageToShow = reader.result;
        const a = reader.result;
        console.log(a);
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
export interface ImageObservable {
  image: Observable<File>;
  position: number;
}
export interface PreviewImage {
  image: string | ArrayBuffer;
  isLoaded: boolean;
}
