
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../common/services/constants.service';
import {ImageObservable} from './workoutoverview.component';
import {WorkoutpreviewpicturesService} from './workoutpreviewpictures.service';


export class WorkoutpreviewpicturesServiceMock extends WorkoutpreviewpicturesService {

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
