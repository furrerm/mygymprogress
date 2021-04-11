import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import { ManagementComponent } from './features/home/management.component';
import { WorkoutComponent } from './features/workout-list/workout.component';
import { TablesComponent } from './features/workout-player/tables.component';
import { WelcomeComponent } from './features/welcome/welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {A11yModule} from '@angular/cdk/a11y';

import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LastSetComponent } from './features/workout-player/last-set/last-set.component';
import { CurrentSetComponent } from './features/workout-player/current-set/current-set.component';
import { ConstantsService } from './core/services/constants.service';

import { HttpClientModule } from '@angular/common/http';


import { AngularFireAuthModule } from '@angular/fire/auth';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { NewWorkoutComponent } from './features/content-creation/new-workout/new-workout.component';
import { WorkoutoverviewComponent } from './features/workoutoverview/workoutoverview.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ReverseArrayPipe } from './shared/ReverseArrayPipe';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import 'echarts/theme/macarons.js';
import { SetImageSizeDirective } from './features/content-creation/new-workout/set-image-size.directive';
import { ExercisePickerComponent } from './features/content-creation/new-workout/exercise-picker/exercise-picker.component';
import { WorkoutDescriptionComponent } from './features/content-creation/new-workout/workout-description/workout-description.component';
import { ContentCreationComponent } from './features/content-creation/content-creation.component';
import { FriendsComponent } from './features/friends/friends.component';
import { SimplePostComponent } from './features/content-creation/simple-post/simple-post.component';
import { RemainingTimeChartComponent } from './features/workout-player/remaining-time-chart/remaining-time-chart.component';
import { EntryPanelComponent } from './features/workout-player/entry-panel/entry-panel.component';
import { DashboardComponent } from './features/workout-player/dashboard/dashboard.component';
import { VideoPlayerComponent } from './features/workout-player/video-player/video-player.component';
import { PieChartComponent } from './features/workout-player/pie-chart/pie-chart.component';
import { NextExercisePreviewComponent } from './features/workout-player/next-exercise-preview/next-exercise-preview.component';
import { KpiComponent } from './features/workout-player/kpi/kpi.component';
import { WorkoutPositionChartComponent } from './features/workout-player/workout-position-chart/workout-position-chart.component';
import { VideoTopBarComponent } from './features/workout-player/video-top-bar/video-top-bar.component';
import { VideoBottomBarComponent } from './features/workout-player/video-bottom-bar/video-bottom-bar.component';
import { ProfileComponent } from './features/profile/profile.component';
import { ImagePickerComponent } from './features/profile/image-picker/image-picker.component';
import { DragImageDirective } from './features/profile/image-picker/drag-image.directive';
import { ProfileImageComponent } from './features/profile/profile-image/profile-image.component';
import { FilterComponent } from './shared/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ManagementComponent,
    WorkoutComponent,
    TablesComponent,
    WelcomeComponent,
    LastSetComponent,
    CurrentSetComponent,
    NewWorkoutComponent,
    WorkoutoverviewComponent,
    ReverseArrayPipe,
    SetImageSizeDirective,
    ExercisePickerComponent,
    WorkoutDescriptionComponent,
    ContentCreationComponent,
    FriendsComponent,
    SimplePostComponent,
    RemainingTimeChartComponent,
    EntryPanelComponent,
    DashboardComponent,
    VideoPlayerComponent,
    PieChartComponent,
    NextExercisePreviewComponent,
    KpiComponent,
    WorkoutPositionChartComponent,
    VideoTopBarComponent,
    VideoBottomBarComponent,
    ProfileComponent,
    ImagePickerComponent,
    DragImageDirective,
    ProfileImageComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule, // for database
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserModule,
    NgxEchartsModule.forRoot({
      echarts: { init: echarts.init }
    })
  ],
  providers: [ConstantsService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
