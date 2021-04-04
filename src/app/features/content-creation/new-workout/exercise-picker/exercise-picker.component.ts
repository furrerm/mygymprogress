import {Component, OnInit, ViewChild} from '@angular/core';
import {ExerciseDTO} from '../../../../core/model/swagger-model/exerciseDTO';
import {AllExercisesService} from './shared/all-exercises.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SaveWorkoutService} from '../shared/save-workout.service';
import {FilterGroupDTO} from '../../../../core/model/swagger-model/filterGroupDTO';
import {FilterService} from '../../../../core/services/filter.service';
import {Exercise} from '../../../../core/model/internal-model/exercise.model';
import {DomSanitizer} from '@angular/platform-browser';
import {WorkoutConverter} from '../../../../core/model/converter/workout-converter';

@Component({
  selector: 'app-exercise-picker',
  templateUrl: './exercise-picker.component.html',
  styleUrls: ['./exercise-picker.component.css',
    '../../../../shared/shared.style.css']
})
export class ExercisePickerComponent implements OnInit {

  private exercises: Exercise[] = [];
  private chosenExercises: ExerciseDTO[] = [];
  private _filteredExercises: Exercise[] = [];
  private exerciseOrder = 0;
  private _filterGroups: FilterGroupDTO[] = [];
  private _filterDivExpanded = false;
  private _exercisesMargin = 0;
  private activeFilters: FilterGroupDTO[] = [];

  @ViewChild('filterContainer') filterContainer;

  constructor(
    private allExercises: AllExercisesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private saveWorkoutService: SaveWorkoutService,
    private filterService: FilterService,
    private readonly sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.getAllExercises();
    this.getAllFilterGroups();
    this.listenForFilterDivHeightChanges();
  }

  get filterGroups(): FilterGroupDTO[] {
    return this._filterGroups;
  }

  get filterDivExpanded(): boolean {
    return this._filterDivExpanded;
  }

  get exercisesMargin(): number {
    return this._exercisesMargin;
  }

  expandCollapseFilterDiv(): void {
    this._filterDivExpanded = this._filterDivExpanded === false ? true : false;
  }

  private getAllExercises(): void {
    this.allExercises.getAllExercises().subscribe(data => {
      this.exercises = new WorkoutConverter().convertDTOToExercise(data, this.sanitizer);
      this.updateFilteredExercises();
    });
  }

  private getAllFilterGroups(): void {
    this.filterService.getAllFilterGroups().subscribe(filterGroups => {
      this._filterGroups = filterGroups;
    });
  }

  get filteredExercises(): Exercise[] {
    return this._filteredExercises;
  }

  public done() {
    this.saveWorkoutService.cachePickedExercises(this.chosenExercises);
    this.router.navigate(['/workoutoverview/workout/new-workout']);
  }

  public selectExercise(exerciseId: number): void {
    const exercise = this.exercises.find(a => a.id === exerciseId);
    this.chosenExercises.push({id: exercise.id, name: exercise.name, order: this.exerciseOrder, setsContainer: [], timeLength: 10});
    ++this.exerciseOrder;

  }

  public isExerciseChosen(exercise: ExerciseDTO): boolean {
    return this.chosenExercises.filter(a => a.id === exercise.id).length > 0;
  }

  public addFilter(filterGroup: FilterGroupDTO, singleFilter: string): void {
    const chosenFilterGroup: FilterGroupDTO = this.activeFilters.find(a => a.name === filterGroup.name);
    if (chosenFilterGroup != null) {
      const indexOfFilter = chosenFilterGroup.filter.indexOf(singleFilter, 0);
      if (indexOfFilter > -1) {
        chosenFilterGroup.filter.splice(indexOfFilter, 1);
        if (chosenFilterGroup.filter.length === 0) {
          this.activeFilters = this.activeFilters.filter(a => a.name !== chosenFilterGroup.name);
        }
      } else {
        chosenFilterGroup.filter.push(singleFilter);
      }
    } else {
      this.activeFilters.push({name: filterGroup.name, filter: [singleFilter]});
    }
    this.updateFilteredExercises();
  }

  public updateFilteredExercises(): void {
    const activeExercises: Exercise[] = [];
    for (const exercise of this.exercises) {
      if (this.exerciseContainsAllActiveFilters(exercise)) {
        activeExercises.push(exercise);
      }
    }
    this._filteredExercises = activeExercises;
  }

  private exerciseContainsAllActiveFilters(exercise: Exercise): boolean {
    for (const activeFilterGroup of this.activeFilters) {
      const exerciseFilterGroup = exercise.filterGroups.find(a => a.name === activeFilterGroup.name);
      if (
        exerciseFilterGroup == null ||
        !this.exerciseFilterGroupContainsAllActiveFiltersFromGroup(activeFilterGroup, exerciseFilterGroup)) {
        return false;
      }
    }
    return true;
  }

  private exerciseFilterGroupContainsAllActiveFiltersFromGroup(
    activeFilterGroup: FilterGroupDTO,
    exerciseFilterGroup: FilterGroupDTO): boolean {
    for (const singleActiveFilter of activeFilterGroup.filter) {
      if (!exerciseFilterGroup.filter.includes(singleActiveFilter)) {
        return false;
      }
    }
    return true;
  }

  filterChosen(filterGroup: FilterGroupDTO, singleFilter: string): boolean {
    const activeFilterGroup = this.activeFilters.find(a => a.name === filterGroup.name);
    if (activeFilterGroup != null) {
      return activeFilterGroup.filter.includes(singleFilter);
    }
    return false;
  }

  listenForFilterDivHeightChanges(): void {

    setInterval(() => {
      if (this.filterContainer) {
        this._exercisesMargin = this.filterContainer.nativeElement.offsetHeight;
      }
    }, 50);
  }
}
