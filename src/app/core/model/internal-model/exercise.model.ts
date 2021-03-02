import {ExerciseSetContainerDTO} from '../swagger-model/exerciseSetContainerDTO';
import {SafeResourceUrl} from '@angular/platform-browser';

export interface Exercise {
  id?: number;
  name?: string;
  setsContainer?: Array<ExerciseSetContainerDTO>;
  order?: number;
  videoUrl?: string;
  image?: string;
  userEntryRequired?: boolean;
  timeLength?: number;
  timeBased?: boolean;
  weight?: boolean;
  videoSrc?: SafeResourceUrl;
}
