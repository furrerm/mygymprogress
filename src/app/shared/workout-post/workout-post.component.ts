import {Component, Input, OnInit} from '@angular/core';
import {WorkoutListing} from '../../features/workout-list/workout-listing';
import {Workout} from '../../core/model/internal-model/workout.model';
import {SavedWorkoutDTO} from '../../core/model/swagger-model/savedWorkoutDTO';
import {WorkoutComponent} from '../../features/workout-list/workout.component';
import {CacheService} from '../../core/services/cache.service';
import {WorkoutService} from './workout.service';
import {ConstantsService} from '../../core/services/constants.service';
import {Day} from '../../core/model/internal-model/day.model';
import {RouterModule} from '@angular/router';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-workout-post',
  templateUrl: './workout-post.component.html',
  styleUrls: ['./workout-post.component.css']
})
export class WorkoutPostComponent implements OnInit {

  @Input() workout: Workout;
  bntStyle = 'btn-default';
  isCollapsed = true;
  toggleImage = 'assets/pictures/menuButtons/toggle_open.png';

  constructor(
    private cacheService: CacheService,
    private workoutService: WorkoutService,
    private constants: ConstantsService,
    private router: Router,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  expandContent(): void {
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      this.toggleImage = 'assets/pictures/menuButtons/toggle_open.png';
    } else {
      this.toggleImage = 'assets/pictures/menuButtons/toggle_close.png';
    }
    this.bntStyle = 'btn-default2';
  }

  likeWorkout(workout: Workout): void {
    if (workout.isSavedFromCurrentUser !== true) {
      workout.isSavedFromCurrentUser = true;
      this.cacheService.addWorkout(workout);
    } else {
      workout.isSavedFromCurrentUser = false;
      this.cacheService.remove(workout);
    }

    const savedWorkout: SavedWorkoutDTO = {userId: this.constants.getUser.id, workoutId: workout.id};
    this.workoutService.likeWorkout(savedWorkout).subscribe(likeAnswer => {
      console.log(likeAnswer);
    });
  }

  likeButtonImage(isLiked: boolean): string {
    return isLiked ? 'assets/pictures/menuButtons/like_active.svg' : 'assets/pictures/menuButtons/like_inactive.svg';
  }

  playDayWorkout(day: Day): void {
    this.cacheService.cacheWorkoutDayToPlay(day);
    this.router.navigate(['play']);
  }
  saveUrl(base64Image: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }
}
