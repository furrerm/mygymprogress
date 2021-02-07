import {DayDTO} from '../swagger-model/dayDTO';
import {UserDTO} from '../swagger-model/userDTO';

export interface Workout {
  id: number;
  name: string;
  imageUrl: string;
  creatorId: number;
  image: string | ArrayBuffer;
  isCollapsed: boolean;
  days: Array<DayDTO>;
  toggleImage: string;

  id?: number;
  name?: string;
  previewImageUrl?: string;
  previewImage?: Array<string>;
  creator?: UserDTO;
  days?: Array<DayDTO>;
}
