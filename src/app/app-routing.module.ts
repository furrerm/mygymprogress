import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagementComponent } from './home/management.component';
import { WorkoutComponent } from './workoutoverview/workout/workout.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TablesComponent } from './workoutoverview/workout/tables/tables.component';
import {NewWorkoutComponent} from './workoutoverview/workout/new-workout/new-workout.component';
import {MenuComponent} from './menu/menu.component';
import {WorkoutoverviewComponent} from './workoutoverview/workoutoverview.component';



const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'welcome', component: WelcomeComponent, pathMatch: 'full' },
  { path: 'management/:id', component: ManagementComponent, pathMatch: 'full' },
  { path: 'workoutoverview/workout', component: WorkoutComponent, pathMatch: 'full' },
  { path: 'workoutoverview', component: WorkoutoverviewComponent, pathMatch: 'full' },
  { path: 'workoutoverview/workout/tables/:savedWorkoutId/:dayId', component: TablesComponent, pathMatch: 'full' },
  { path: 'workoutoverview/workout/new-workout', component: NewWorkoutComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', relativeLinkResolution: 'legacy' }),
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }







