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
import {DomSanitizer} from '@angular/platform-browser';
import {NamedNumber} from '../internal-model/NamedNumber';

export class WorkoutConverter {
  private muscleTargets: NamedNumber[] = [{name: 'Chest', value: 70}, {name: 'Biceps', value: 20}, {name: 'Triceps', value: 10}];
  private stretchingTargets: NamedNumber[] = [{name: 'Leg', value: 40}, {name: 'Arm', value: 35}, {name: 'Back', value: 25}];

  constructor(private sanitizer: DomSanitizer) {
  }

  convertWorkoutToDTO(workout: Workout): WorkoutDTO {
    return {
      id: workout.id,
      name: workout.name,
      previewImageUrl: workout.imageUrl,
      creator: null,
      days: workout.days.map(a => this.convertDayToDTO(a)),
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
      image: null,
      userEntryRequired: exericse.userEntryRequired,
      timeLength: exericse.timeLength,
      timeBased: exericse.timeBased,
      weight: exericse.weight
    };
  }

  convertDTOsToWorkouts(workoutDTOS: WorkoutDTO[]): Workout[] {


    return workoutDTOS.map(x => ({
        image: x.previewImage,
        id: x.id,
        name: x.name,
        imageUrl: x.previewImageUrl,
        creatorId: x.creator.id,
        days: this.convertDTOsToDay(x.days),
        isSavedFromCurrentUser: x.savedFromCurrentUser
      })
    );

  }

  convertDTOToWorkout(workoutDTO: WorkoutDTO): Workout {

    return {
      image: workoutDTO.previewImage,
      id: workoutDTO.id,
      name: workoutDTO.name,
      imageUrl: workoutDTO.previewImageUrl,
      previewImage: workoutDTO.previewImage,
      creatorId: workoutDTO.creator.id,
      days: this.convertDTOsToDay(workoutDTO.days),
      isSavedFromCurrentUser: workoutDTO.savedFromCurrentUser
    };

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
        image: x.image != null ? this.sanitizer.bypassSecurityTrustResourceUrl(x.image) : null,
        userEntryRequired: x.userEntryRequired,
        timeLength: x.timeLength,
        timeBased: x.timeBased,
        weight: x.weight,
        videoSrc: new BehaviorSubject<File>(null),
        filterGroups: x.filterGroups,
        muscleTarget: x.muscleTargets,
        stretchingTarget: x.stretchingTargets,
        caloriesPerSecond: 17.2
      })
    );
  }
}
