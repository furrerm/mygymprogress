import {DayDTO} from '../../../core/model/swagger-model/dayDTO';

export interface SavedWorkouts {
  id: number;
  name: string;
  imageUrl: string;
  userId: number;
  image: string | ArrayBuffer;
  isImageLoaded: boolean;
  isCollapsed: boolean;
  days: Array<DayDTO>;
  toggleImage: string;
}
