import { Component, OnInit } from '@angular/core';
import {WorkoutListing} from '../workout-list/workout-listing';
import {CacheService} from '../../core/services/cache.service';
import { FilterGroupDTO } from 'src/app/core/model/swagger-model/filterGroupDTO';
import {Workout} from '../../core/model/internal-model/workout.model';

@Component({
  selector: 'app-saved-workouts',
  templateUrl: './saved-workouts.component.html',
  styleUrls: ['./saved-workouts.component.css', '../../shared/shared.style.css']
})
export class SavedWorkoutsComponent implements OnInit {

  workouts: Workout[];
  filterGroups: FilterGroupDTO[];

  constructor(
    private cacheService: CacheService) { }

  ngOnInit(): void {
    this.getWorkoutListings();
    this.getFilterGroups();
  }

  private getWorkoutListings(): void {
    this.cacheService.getSavedWorkouts().subscribe(workouts => {
      this.workouts = workouts;
    });
  }

  private getFilterGroups(): void {
    this.cacheService.getExerciseFilters().subscribe(filterGroups => {
      this.filterGroups = filterGroups;
    });
  }
}
