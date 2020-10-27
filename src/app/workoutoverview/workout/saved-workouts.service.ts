import { Injectable } from '@angular/core';
import {SavedWorkouts} from './saved-workouts.Workout';
import {WorkoutsService} from './workouts.service';
import {WorkoutpreviewpicturesService} from '../workoutpreviewpictures.service';

@Injectable({
  providedIn: 'root'
})
export class SavedWorkoutsService {
  private savedWorkouts: SavedWorkouts[];
  constructor(private workoutsService: WorkoutsService,
              private workoutpreviewpicturesService: WorkoutpreviewpicturesService) { }

  public get getSavedWorkouts(): SavedWorkouts[] {
    return this.savedWorkouts;
  }

  public set setSavedWorkouts(value: SavedWorkouts[]) {
    this.savedWorkouts = value;
  }

  convertJsonDataToWorkouts(inputData) {
    const innerWorkouts: SavedWorkouts[] = [];
    const workoutsAsJson = JSON.parse(JSON.stringify(inputData));

    workoutsAsJson.forEach(x => {
      innerWorkouts.push({
        image: undefined,
        isImageLoaded: false,
        id: x.id,
        name: x.name,
        imageUrl: x.imageUrl,
        userId: x.userId,
        isCollapsed: true,
        days: x.days.map(a => ({
            id: a.id,
            name: a.name,
            phases: a.phases.map(b => ({
              id: b.id,
              name: b.name,
              exercises: b.exercises.map(c => ({
                id: c.id,
                name: c.name
              }))
            }))
          })
        ),
        toggleImage: '../../assets/pictures/menuButtons/toggle_open.png'
      });
    });
    return innerWorkouts;
  }
}
