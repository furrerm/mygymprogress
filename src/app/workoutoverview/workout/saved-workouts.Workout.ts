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

interface Day {
  id: number;
  name: string;
  phases: Phase[];
}

interface Phase {
  id: number;
  name: string;
  exercises: Exercise[];
}

interface Exercise {
  id: number;
  name: string;
}
