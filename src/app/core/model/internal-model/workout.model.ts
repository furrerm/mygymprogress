import {Day} from './day.model';

export interface Workout {
  id: number;
  name: string;
  imageUrl: string;
  // todo: return a preview image until real image is loaded
  previewImage?: string;
  // todo: extract the creator id
  creatorId: number;
  image: string | ArrayBuffer;
  days: Array<Day>;
  isSavedFromCurrentUser: boolean;
}
