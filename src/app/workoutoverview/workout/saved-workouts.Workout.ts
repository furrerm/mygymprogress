export interface SavedWorkouts {
  id: number;
  name: string;
  imageUrl: string;
  userId: number;
  image: string | ArrayBuffer;
  isImageLoaded: boolean;
  isCollapsed: boolean;
  days: Day[];
  toggleImage: string;
}

export interface Day {
  id: number;
  name: string;
  phases: Phase[];
}

export interface Phase {
  id: number;
  name: string;
  exercises: Exercise[];
}

export interface Exercise {
  id: number;
  name: string;
  setContainers: SetContainer[];
}

/*
var utcSeconds = 1234567890;
var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
d.setUTCSeconds(utcSeconds);
 */
export interface SetContainer {
  timeOfExercise: Date;
  exerciseSets: ExerciseSet[];
}
export interface ExerciseSet {
  id: number;
  weight: number;
  repetitions: number;
}
