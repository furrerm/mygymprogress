import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagementComponent } from './management/management.component';
import { WorkoutComponent } from './workout/workout.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MusclegroupsComponent } from './workout/musclegroups/musclegroups.component';
import { TablesComponent } from './workout/tables/tables.component';



const routes: Routes = [
  { path: '', component: WelcomeComponent, pathMatch: 'full' },
  { path: 'management/:id', component: ManagementComponent, pathMatch: 'full' },
  { path: 'workout', component: WorkoutComponent, pathMatch: 'full' },
  { path: 'workout/musclegroups', component: MusclegroupsComponent, pathMatch: 'full' },
  { path: 'workout/tables/:exercise', component: TablesComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }







