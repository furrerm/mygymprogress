import {DayDTO} from '../swagger-model/dayDTO';
import {UserDTO} from '../swagger-model/userDTO';

export interface Workout {
  id: number;
  name: string;
  imageUrl: string;
  // todo: return a preview image until real image is loaded
  previewImage?: Array<string>;
  // todo: extract the creator id
  creatorId: number;
  image: string | ArrayBuffer;
  days: Array<DayDTO>;
}
