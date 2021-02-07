
import {Observable, of} from 'rxjs';
import {ImageObservable} from '../workoutoverview.component';
import {WorkoutOverviewPicturesService} from './workout-overview-pictures.service';


export class WorkoutOverviewPicturesServiceMock extends WorkoutOverviewPicturesService {

  getUrls(): Observable<any> {
    return of(['url1', 'url2']);
  }

  getFiles(imagePosition, url1: string): ImageObservable {
    const bytestemp = '1,2,3,4,5,6,7';
    const bytes = new Uint8Array(bytestemp.length);
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = bytestemp.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const file: File = blob as File;
    const result: ImageObservable = {image: of(file), position: imagePosition};
    return result;
  }

}
