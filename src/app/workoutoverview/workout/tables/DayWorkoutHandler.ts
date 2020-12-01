import {Day, Exercise, ExerciseSet, SetContainer} from '../saved-workouts.Workout';
import {LastSetService} from './last-set.service';
import {BehaviorSubject, Observable} from 'rxjs';

export interface DayWorkoutHandler {
  getDayWorkout(): Day;
  getUpdatedWorkout(): BehaviorSubject<Day>;
  getUpdatedExercise(): BehaviorSubject<Exercise>;
  nextExercise(): void;
  isLastExerciseOfDayWorkout(): boolean;
}

export class DayWorkoutHandlerExerciseBased implements DayWorkoutHandler {
  private updatedDayWorkout: BehaviorSubject<Day>;
  private updatedExercise: BehaviorSubject<Exercise>;
  private dayWorkout: Day;
  private exercisePointer: ExercisePointer;
  constructor(dayWorkout: Day, lastSetService: LastSetService) {
    this.updatedDayWorkout = new BehaviorSubject<Day>(dayWorkout);
    this.updatedExercise = new BehaviorSubject<Exercise>(null);
    this.dayWorkout = dayWorkout;
    this.loadSets(lastSetService);
    this.exercisePointer = {phaseNumber: 0, exerciseNumber: -1};
  }
  getDayWorkout(): Day {
    return this.dayWorkout;
  }
  getUpdatedWorkout(): BehaviorSubject<Day> {
    return this.updatedDayWorkout;
  }
  getUpdatedExercise(): BehaviorSubject<Exercise> {
    return this.updatedExercise;
  }

  nextExercise() {
    const currentPhaseId = this.exercisePointer.phaseNumber;
    const currentExerciseId = this.exercisePointer.exerciseNumber;
    const phases = this.dayWorkout.phases;
    const exercises = phases[currentPhaseId].exercises;
    let currentExercise: Exercise;
    if (!this.isLastExerciseOfDayWorkout()) {
      if (exercises[currentExerciseId + 1]) {
        this.exercisePointer.exerciseNumber++;
        currentExercise = exercises[this.exercisePointer.exerciseNumber];
      } else if (phases[currentPhaseId + 1]) {
        this.exercisePointer.phaseNumber++;
        this.exercisePointer.exerciseNumber = 0;
        currentExercise = phases[this.exercisePointer.phaseNumber].exercises[0];
      }
      currentExercise.setsContainer = this.copyLastEntry(currentExercise);
    }
    this.updatedExercise.next(currentExercise);
  }

  public loadSets(lastSetService: LastSetService) {
    const exerciseIds: number[] = [].concat(...this.dayWorkout?.phases.map(a => a.exercises)).map(a => a.id);
    lastSetService.getSets(exerciseIds).subscribe(sets => {
      const workoutsAsJson = JSON.parse(JSON.stringify(sets));
      this.addSetsToDayWorkout(workoutsAsJson);
      this.nextExercise();
    });
  }
  private addSetsToDayWorkout(workoutsAsJson) {
    workoutsAsJson.forEach(a => a.setsContainer?.forEach(b => b.exerciseSets.forEach(c =>
      this.dayWorkout.phases.forEach(d => d.exercises.forEach(e => {
        if (e.id === a.id) {
          e.setsContainer = a.setsContainer;
          this.transformSetContainersStringToDate(e.setsContainer);
        }
      }))
    )));
    this.updatedDayWorkout.next(null);
    this.updatedDayWorkout.next(this.dayWorkout);
  }
  private transformSetContainersStringToDate(exerciseSetContainers: SetContainer[]) {
    exerciseSetContainers?.forEach(c => c.timeOfExercise = new Date(c.timeOfExercise));
  }
  private isLastPhaseOfDayWorkout(): boolean {
    const currentPhaseId = this.exercisePointer.phaseNumber;
    const phases = this.dayWorkout.phases;
    if (phases[currentPhaseId + 1]) {
      return false;
    }
    return true;
  }

  private isLastExerciseOfPhase(): boolean {
    const currentPhaseId = this.exercisePointer.phaseNumber;
    const currentExerciseId = this.exercisePointer.exerciseNumber;
    const phases = this.dayWorkout.phases;
    const exercises = phases[currentPhaseId].exercises;
    if (exercises[currentExerciseId + 1]) {
      return false;
    }
    return true;
  }

  isLastExerciseOfDayWorkout(): boolean {
    return this.isLastPhaseOfDayWorkout() && this.isLastExerciseOfPhase();
  }

  private copyLastEntry(currentExercise: Exercise) {
    let setsContainers: SetContainer[] = currentExercise.setsContainer;
    if (setsContainers) {
      setsContainers.sort((a, b) => new Date(a.timeOfExercise).getTime() - new Date(b.timeOfExercise).getTime());
      const containerLength = currentExercise.setsContainer.length;
      setsContainers.push(this.createCopy(currentExercise.setsContainer[containerLength - 1]));
      setsContainers[containerLength].timeOfExercise = new Date(Date.now());
    } else {
      const setsContainersToCreate: SetContainer[] = [];
      const initialExerciseSets: ExerciseSet[] = [];
      initialExerciseSets.push({id: 0, weight: 0, repetitions: 0});
      initialExerciseSets.push({id: 0, weight: 0, repetitions: 0});
      initialExerciseSets.push({id: 0, weight: 0, repetitions: 0});
      setsContainersToCreate.push({timeOfExercise: new Date(Date.now()), exerciseSets: initialExerciseSets});
      setsContainers = setsContainersToCreate;
    }
    return setsContainers;
  }
  private createCopy(inputSetContainer: SetContainer): SetContainer {
    const exerciseSetsCopy: ExerciseSet[] = inputSetContainer.exerciseSets.map(a => {
      const exerciseSetTemp: ExerciseSet = {id: a.id, repetitions: a.repetitions, weight: a.weight};
      return exerciseSetTemp;
    });
    const setContainer: SetContainer = {timeOfExercise: new Date(inputSetContainer.timeOfExercise), exerciseSets: exerciseSetsCopy};
    return setContainer;
  }
}
interface ExercisePointer {
  phaseNumber: number;
  exerciseNumber: number;
}
