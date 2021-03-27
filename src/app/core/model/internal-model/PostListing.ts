import {Workout} from './workout.model';
import {SimplePostDTO} from '../swagger-model/simplePostDTO';

export interface PostListing {
  workout: Workout;
  simplePost: SimplePostDTO;
  isCollapsed: boolean;
  toggleImage: string;
}
