import {Workout} from '../internal-model/workout.model';
import {WorkoutDTO} from '../swagger-model/workoutDTO';
import {PhaseDTO} from '../swagger-model/phaseDTO';
import {DayDTO} from '../swagger-model/dayDTO';
import {Phase} from '../internal-model/phase.model';
import {Day} from '../internal-model/day.model';
import {ExerciseDTO} from '../swagger-model/exerciseDTO';
import {Exercise} from '../internal-model/exercise.model';

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
        days: this.convertDTOsToDay(x.days),
        isSavedFromCurrentUser: x.savedFromCurrentUser
      })
    );
  }
  convertDTOsToDay(dayDTOs: DayDTO[]): Day[] {

    return dayDTOs.map(x => ({
      id: x.id,
      name: x.name,
      phases: this.convertDTOToPhase(x.phases)
      })
    );
  }
  convertDTOToPhase(phaseDTOs: PhaseDTO[]): Phase[] {

    return phaseDTOs.map(x => ({
      id: x.id,
      name: x.name,
      exercises: this.convertDTOToExercise(x.exercises),
      order: x.order
      })
    );
  }
  convertDTOToExercise(exerciseDTOs: ExerciseDTO[]): Exercise[] {

    return exerciseDTOs.map(x => ({
      id: x.id,
      name: x.name,
      setsContainer: x.setsContainer,
      order: x.order,
      videoUrl: x.videoUrl,
      image: x.image,
      userEntryRequired: x.userEntryRequired,
      timeLength: x.timeLength,
      timeBased: x.timeBased,
      weight: x.weight,
      videoSrc: ''
      })
    );
  }
}
