import {LastSetService} from './shared/last-set.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {ExerciseDTO} from '../../core/model/swagger-model/exerciseDTO';
import {DayDTO} from '../../core/model/swagger-model/dayDTO';
import {ExerciseSetContainerDTO} from '../../core/model/swagger-model/exerciseSetContainerDTO';
import {ExerciseSetDTO} from '../../core/model/swagger-model/exerciseSetDTO';
import {PhaseDTO} from '../../core/model/swagger-model/phaseDTO';

export interface DayWorkoutHandler {
  getWorkout(): BehaviorSubject<DayDTO>;

  getExercise(): Subject<ExerciseDTO>;

  nextExercise(): void;

  isLastExerciseOfDayWorkout(): boolean;
}

// todo: reconsider the states eg. dayWorkout
export class DayWorkoutHandlerExerciseBased implements DayWorkoutHandler {
  private readonly updatedDayWorkout: BehaviorSubject<DayDTO>;
  private updatedExercise: Subject<ExerciseDTO> = new Subject<ExerciseDTO>();
  private dayWorkout: DayDTO;
  private exercisePointer: ExercisePointer;

  constructor(dayWorkout: DayDTO, lastSetService: LastSetService) {
    this.updatedDayWorkout = new BehaviorSubject<DayDTO>(dayWorkout);
    this.dayWorkout = dayWorkout;
    this.exercisePointer = {phaseNumber: 0, exerciseNumber: -1};
    this.loadSets(lastSetService);
  }

  getWorkout(): BehaviorSubject<DayDTO> {
    return this.updatedDayWorkout;
  }

  getExercise(): Subject<ExerciseDTO> {
    return this.updatedExercise;
  }

  // todo: implement iterator principle
  nextExercise() {
    const exercises = this.dayWorkout.phases[this.exercisePointer.phaseNumber].exercises;
    let currentExercise: ExerciseDTO;
    if (!this.isLastExerciseOfDayWorkout()) {
      if (exercises[this.exercisePointer.exerciseNumber + 1]) {
        this.exercisePointer.exerciseNumber++;
        currentExercise = exercises[this.exercisePointer.exerciseNumber];
      } else if (this.dayWorkout.phases[this.exercisePointer.phaseNumber + 1]) {
        this.exercisePointer.phaseNumber++;
        this.exercisePointer.exerciseNumber = 0;
        currentExercise = this.dayWorkout.phases[this.exercisePointer.phaseNumber].exercises[0];
      }
      currentExercise.setsContainer = this.copyLastEntry(currentExercise);
    }
    this.updatedExercise.next(currentExercise);
  }

  public loadSets(lastSetService: LastSetService) {
    const exerciseIds: number[] = [].concat(...this.dayWorkout?.phases.map(a => a.exercises))
      .map(a => a.id);
    lastSetService.getSets(exerciseIds)
      .subscribe((exerciseDTOSWithSets: ExerciseDTO[]) => {
        this.dayWorkout = this.addSetsToDayWorkout(exerciseDTOSWithSets);
        this.updatedDayWorkout.next(this.dayWorkout);
        this.nextExercise();
      });
  }


  private addSetsToDayWorkout(exerciseDTOSWithSets: ExerciseDTO[]): DayDTO {
    this.dayWorkout.phases = this.dayWorkout.phases.map((phase: PhaseDTO) => {
      return this.addSetsToPhase(exerciseDTOSWithSets, phase);
    });
    return this.dayWorkout;
  }

  private addSetsToPhase(exerciseDTOSWithSets: ExerciseDTO[], phase: PhaseDTO): PhaseDTO {
    phase.exercises = phase.exercises.map((exercise: ExerciseDTO) => {
      return this.addSetsToExercise(exerciseDTOSWithSets, exercise);
    });
    return phase;
  }

  private addSetsToExercise(exerciseDTOSWithSets: ExerciseDTO[], exercise: ExerciseDTO): ExerciseDTO {
    const exerciseTemp: ExerciseDTO = exerciseDTOSWithSets.find(exerciseDTOWithSets => exerciseDTOWithSets.id === exercise.id);
    exercise.setsContainer = exerciseTemp.setsContainer.map((setContainerWithSets: ExerciseSetContainerDTO) => {
        setContainerWithSets.timeOfExercise = new Date(setContainerWithSets.timeOfExercise);
        return setContainerWithSets;
      }
    );
    return exercise;
  }

// todo: why is it called 1000 times
  private isLastPhaseOfDayWorkout(): boolean {
    const currentPhaseId = this.exercisePointer.phaseNumber;
    const phases = this.dayWorkout.phases;
    return !(phases[currentPhaseId + 1]);
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

  private copyLastEntry(currentExercise: ExerciseDTO) {
    const containerLength = currentExercise.setsContainer.length;
    let setsContainers: ExerciseSetContainerDTO[] = currentExercise.setsContainer;
    if (setsContainers) {
      setsContainers.sort((a, b) => new Date(a.timeOfExercise).getTime() - new Date(b.timeOfExercise).getTime());
      setsContainers.push(this.createCopy(currentExercise.setsContainer[containerLength - 1]));
      setsContainers[containerLength].timeOfExercise = new Date(Date.now());
    } else {
      setsContainers = this.initializeSetContainer();
    }
    return setsContainers;
  }

  private initializeSetContainer(): ExerciseSetContainerDTO[] {
    const setsContainersToCreate: ExerciseSetContainerDTO[] = [];
    setsContainersToCreate.push({timeOfExercise: new Date(Date.now()), exerciseSets: this.initializeExerciseSets()});
    return setsContainersToCreate;
  }

  private initializeExerciseSets(): ExerciseSetDTO[] {
    const initialExerciseSets: ExerciseSetDTO[] = [];
    initialExerciseSets.push({id: 0, weight: 0, repetitions: 0});
    initialExerciseSets.push({id: 0, weight: 0, repetitions: 0});
    initialExerciseSets.push({id: 0, weight: 0, repetitions: 0});
    return initialExerciseSets;
  }

  private createCopy(inputSetContainer: ExerciseSetContainerDTO): ExerciseSetContainerDTO {
    let exerciseSets: ExerciseSetDTO[];
    let timeOfExercise: Date;
    if (inputSetContainer) {
      exerciseSets = inputSetContainer.exerciseSets.map(a => {
        return {id: a.id, repetitions: a.repetitions, weight: a.weight};
      });
      timeOfExercise = new Date(inputSetContainer.timeOfExercise);
    } else {
      exerciseSets = [{id: 0, repetitions: 0, weight: 0}];
      timeOfExercise = new Date(Date.now());
    }
    return {timeOfExercise, exerciseSets};
  }
}

interface ExercisePointer {
  phaseNumber: number;
  exerciseNumber: number;
}
