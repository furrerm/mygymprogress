import {Component, ElementRef, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConstantsService} from '../../core/services/constants.service';
import {WorkoutpreviewpicturesService} from './shared/workoutpreviewpictures.service';
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
    this.workoutpreviewpicturesService.getUrls().subscribe( data => {
      for (const i in data) {
        if (data.hasOwnProperty(i)) {
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
