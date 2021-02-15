import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagementComponent } from './features/home/management.component';
import { WorkoutComponent } from './features/workout-list/workout.component';
import { WelcomeComponent } from './features/welcome/welcome.component';
import { TablesComponent } from './features/workout-player/tables.component';
import {NewWorkoutComponent} from './features/new-workout/new-workout.component';
import {MenuComponent} from './shared/menu/menu.component';
import {WorkoutoverviewComponent} from './features/workoutoverview/workoutoverview.component';
import {ExercisePickerComponent} from './features/new-workout/exercise-picker/exercise-picker.component';
import {WorkoutDescriptionComponent} from './features/new-workout/workout-description/workout-description.component';



const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'welcome', component: WelcomeComponent, pathMatch: 'full' },
  { path: 'management/:id', component: ManagementComponent, pathMatch: 'full' },
  { path: 'workoutoverview/workout', component: WorkoutComponent, pathMatch: 'full' },
  { path: 'workoutoverview', component: WorkoutoverviewComponent, pathMatch: 'full' },
  { path: 'workoutoverview/workout/tables/:savedWorkoutId/:dayId', component: TablesComponent, pathMatch: 'full' },
  { path: 'workoutoverview/workout/new-workout', component: NewWorkoutComponent, pathMatch: 'full' },
  { path: 'workoutoverview/workout/new-workout/exercises', component: ExercisePickerComponent, pathMatch: 'full' },
  { path: 'workoutoverview/workout/new-workout/description', component: WorkoutDescriptionComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', relativeLinkResolution: 'legacy' }),
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }







