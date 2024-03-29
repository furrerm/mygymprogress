import {ExerciseSetContainerDTO} from '../swagger-model/exerciseSetContainerDTO';
import {SafeResourceUrl} from '@angular/platform-browser';
import {BehaviorSubject} from 'rxjs';
import {FilterGroupDTO} from '../swagger-model/filterGroupDTO';
import {NamedNumber} from './NamedNumber';

export interface Exercise {
  id?: number;
  name?: string;
  setsContainer?: Array<ExerciseSetContainerDTO>;
  order?: number;
  videoUrl?: string;
  image?: SafeResourceUrl;
  userEntryRequired?: boolean;
  timeLength?: number;
  timeBased?: boolean;
  weight?: boolean;
  videoSrc?: BehaviorSubject<File>;
  filterGroups?: Array<FilterGroupDTO>;
  muscleTarget?: Array<NamedNumber>;
  stretchingTarget?: Array<NamedNumber>;
  caloriesPerSecond?: number;
}
