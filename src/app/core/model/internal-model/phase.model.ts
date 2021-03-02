import {Exercise} from './exercise.model';

export interface Phase {
  id?: number;
  name?: string;
  exercises?: Array<Exercise>;
  order?: number;
}
