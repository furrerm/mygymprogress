import {Day} from './day.model';
import {UserDTO} from '../swagger-model/userDTO';

export interface Workout {
  id: number;
  name: string;
  imageUrl: string;
  // todo: return a preview image until real image is loaded
  previewImage?: string;
  // todo: extract the creator id
  creator: UserDTO;
  image: string;
  days: Array<Day>;
  isSavedFromCurrentUser: boolean;
}
