import {Phase} from './phase.model';

export interface Day {
  id?: number;
  name?: string;
  phases?: Array<Phase>;
}
