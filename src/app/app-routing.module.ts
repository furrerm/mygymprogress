import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagementComponent } from './features/home/management.component';
import { WorkoutComponent } from './features/workout-list/workout.component';
import { WelcomeComponent } from './features/welcome/welcome.component';
import { TablesComponent } from './features/workout-player/tables.component';
import {NewWorkoutComponent} from './features/content-creation/new-workout/new-workout.component';
import {MenuComponent} from './shared/menu/menu.component';
import {WorkoutoverviewComponent} from './features/workoutoverview/workoutoverview.component';
import {ExercisePickerComponent} from './features/content-creation/new-workout/exercise-picker/exercise-picker.component';
import {WorkoutDescriptionComponent} from './features/content-creation/new-workout/workout-description/workout-description.component';
import {ContentCreationComponent} from './features/content-creation/content-creation.component';
import {FriendsComponent} from './features/friends/friends.component';
import {SimplePostComponent} from './features/content-creation/simple-post/simple-post.component';
import {RemainingTimeChartComponent} from './features/workout-player/remaining-time-chart/remaining-time-chart.component';
import {DashboardComponent} from './features/workout-player/dashboard/dashboard.component';
import {VideoTopBarComponent} from './features/workout-player/video-top-bar/video-top-bar.component';
import {VideoBottomBarComponent} from './features/workout-player/video-bottom-bar/video-bottom-bar.component';
import {WorkoutPositionChartComponent} from './features/workout-player/workout-position-chart/workout-position-chart.component';
import {PieChartComponent} from './features/workout-player/pie-chart/pie-chart.component';
import {LastSetComponent} from './features/workout-player/last-set/last-set.component';
import {ProfileComponent} from './features/profile/profile.component';
import {FilterComponent} from './shared/filter/filter.component';
import {SavedWorkoutsComponent} from './features/saved-workouts/saved-workouts.component';



const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'content-creation', component: ContentCreationComponent, pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent, pathMatch: 'full' },
  { path: 'friends', component: FriendsComponent, pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent, pathMatch: 'full' },
  { path: 'management/:id', component: ManagementComponent, pathMatch: 'full' },
  { path: 'workoutoverview/workout', component: WorkoutComponent, pathMatch: 'full' },
  { path: 'workoutoverview', component: WorkoutoverviewComponent, pathMatch: 'full' },
  { path: 'workoutoverview/workout/tables/:savedWorkoutId/:dayId', component: TablesComponent, pathMatch: 'full' },
  { path: 'workoutoverview/workout/new-workout', component: NewWorkoutComponent, pathMatch: 'full' },
  { path: 'workoutoverview/workout/simple-post', component: SimplePostComponent, pathMatch: 'full' },
  { path: 'workoutoverview/workout/new-workout/exercises', component: ExercisePickerComponent, pathMatch: 'full' },
  { path: 'workoutoverview/workout/new-workout/description', component: WorkoutDescriptionComponent, pathMatch: 'full' },
  { path: 'workout-player/remaining-time-chart', component: RemainingTimeChartComponent, pathMatch: 'full' },
  { path: 'workout-player/dashboard', component: DashboardComponent, pathMatch: 'full' },
  { path: 'workout-player/video-top-bar', component: VideoTopBarComponent, pathMatch: 'full' },
  { path: 'workout-player/video-bottom-bar', component: VideoBottomBarComponent, pathMatch: 'full' },
  { path: 'workout-player/workout-position-chart', component: WorkoutPositionChartComponent, pathMatch: 'full' },
  { path: 'workout-player/pie-chart', component: PieChartComponent, pathMatch: 'full' },
  { path: 'workout-player/last-set', component: LastSetComponent, pathMatch: 'full' },
  { path: 'ashitytest', component: FilterComponent, pathMatch: 'full' },
  { path: 'play', component: TablesComponent, pathMatch: 'full' },
  { path: 'saved-workouts-list', component: SavedWorkoutsComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', relativeLinkResolution: 'legacy' }),
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }







