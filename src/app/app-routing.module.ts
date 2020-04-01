import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagementComponent } from './management/management.component';
import { WorkoutComponent } from './workout/workout.component';
import { WelcomeComponent } from './welcome/welcome.component';



const routes: Routes = [
  { path: '', component: WelcomeComponent, pathMatch: 'full' },
  { path: 'management', component: ManagementComponent },
  { path: 'workout/:exercise', component: WorkoutComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }









