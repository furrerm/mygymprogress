import {Day, Exercise, ExerciseSet, SetContainer} from '../saved-workouts.Workout';
import {LastSetService} from './last-set.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

export interface DayWorkoutHandler {
  getWorkout(): BehaviorSubject<Day>;
  getExercise(): Subject<Exercise>;
  nextExercise(): void;
  isLastExerciseOfDayWorkout(): boolean;
}

export class DayWorkoutHandlerExerciseBased implements DayWorkoutHandler {
  private readonly updatedDayWorkout: BehaviorSubject<Day>;
  private updatedExercise: Subject<Exercise> = new Subject<Exercise>();
  private readonly dayWorkout: Day;
  private exercisePointer: ExercisePointer;
  constructor(dayWorkout: Day, lastSetService: LastSetService) {
    this.updatedDayWorkout = new BehaviorSubject<Day>(dayWorkout);
    this.dayWorkout = dayWorkout;
    this.loadSets(lastSetService);
    this.exercisePointer = {phaseNumber: 0, exerciseNumber: -1};
  }

  getWorkout(): BehaviorSubject<Day> {
    return this.updatedDayWorkout;
  }
  getExercise(): Subject<Exercise> {
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
    this.updatedDayWorkout.next(this.dayWorkout);
  }
  private transformSetContainersStringToDate(exerciseSetContainers: SetContainer[]) {
    exerciseSetContainers?.forEach(c => c.timeOfExercise = new Date(c.timeOfExercise));
  }
  private isLastPhaseOfDayWorkout(): boolean {
    const currentPhaseId = this.exercisePointer.phaseNumber;
    const phases = this.dayWorkout.phases;
    return !!(phases[currentPhaseId + 1]);
  }

  private isLastExerciseOfPhase(): boolean {
    const currentPhaseId = this.exercisePointer.phaseNumber;
    const currentExerciseId = this.exercisePointer.exerciseNumber;
    const phases = this.dayWorkout.phases;
    const exercises = phases[currentPhaseId].exercises;
    return !exercises[currentExerciseId + 1];
  }

  isLastExerciseOfDayWorkout(): boolean {
    return this.isLastPhaseOfDayWorkout() && this.isLastExerciseOfPhase();
  }

  private copyLastEntry(currentExercise: Exercise) {
    const containerLength = currentExercise.setsContainer.length;
    let setsContainers: SetContainer[] = currentExercise.setsContainer;
    if (setsContainers) {
      setsContainers.sort((a, b) => new Date(a.timeOfExercise).getTime() - new Date(b.timeOfExercise).getTime());
      setsContainers.push(this.createCopy(currentExercise.setsContainer[containerLength - 1]));
      setsContainers[containerLength].timeOfExercise = new Date(Date.now());
    } else {
      setsContainers = this.initializeSetContainer();
    }
    return setsContainers;
  }
  private initializeSetContainer(): SetContainer[] {
    const setsContainersToCreate: SetContainer[] = [];
    setsContainersToCreate.push({timeOfExercise: new Date(Date.now()), exerciseSets: this.initnializeExerciseSets()});
    return setsContainersToCreate;
  }
  private initnializeExerciseSets(): ExerciseSet[] {
    const initialExerciseSets: ExerciseSet[] = [];
    initialExerciseSets.push({id: 0, weight: 0, repetitions: 0});
    initialExerciseSets.push({id: 0, weight: 0, repetitions: 0});
    initialExerciseSets.push({id: 0, weight: 0, repetitions: 0});
    return initialExerciseSets;
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
