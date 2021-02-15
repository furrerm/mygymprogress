import {Workout} from '../internal-model/workout.model';
import {WorkoutDTO} from '../swagger-model/workoutDTO';

export class WorkoutConverter {
  convertWorkoutToDTO(workout: Workout): WorkoutDTO {
    return {
      id: workout.id,
      name: workout.name,
      previewImageUrl: workout.imageUrl,
      creator: null,
      days: workout.days,
      savedFromCurrentUser: workout.isSavedFromCurrentUser
    };
  }

  convertDTOToWorkout(workoutDTOS: WorkoutDTO[]): Workout[] {

    return workoutDTOS.map(x => ({
        image: undefined,
        id: x.id,
        name: x.name,
        imageUrl: x.previewImageUrl,
        creatorId: x.creator.id,
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
        isSavedFromCurrentUser: x.savedFromCurrentUser
      })
    );
  }
}
