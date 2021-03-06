import {Workout} from '../internal-model/workout.model';
import {WorkoutDTO} from '../swagger-model/workoutDTO';
import {PhaseDTO} from '../swagger-model/phaseDTO';
import {DayDTO} from '../swagger-model/dayDTO';
import {Phase} from '../internal-model/phase.model';
import {Day} from '../internal-model/day.model';
import {ExerciseDTO} from '../swagger-model/exerciseDTO';
import {Exercise} from '../internal-model/exercise.model';
import {BehaviorSubject} from 'rxjs';
import {ExerciseSetContainerDTO} from '../swagger-model/exerciseSetContainerDTO';

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
  convertDayToDTO(day: Day): DayDTO {
    return {
      id: day.id,
      name: day.name,
      phases: day.phases.map(a => this.convertPhaseToDTO(a))
    };
  }
  convertPhaseToDTO(phase: Phase): PhaseDTO {
    return {
      id: phase.id,
      name: phase.name,
      exercises: phase.exercises.map(a => this.convertExerciseToDTO(a)),
      order: phase.order
    };
  }
  convertExerciseToDTO(exericse: Exercise): ExerciseDTO {
    return {
      id: exericse.id,
      name: exericse.name,
      setsContainer: exericse.setsContainer,
      order: exericse.order,
      videoUrl: exericse.videoUrl,
      image: exericse.image,
      userEntryRequired: exericse.userEntryRequired,
      timeLength: exericse.timeLength,
      timeBased: exericse.timeBased,
      weight: exericse.weight
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
      videoSrc: new BehaviorSubject<File>(null)
      })
    );
  }
}
