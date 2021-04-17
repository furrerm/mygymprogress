import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Workout} from '../../../core/model/internal-model/workout.model';
import {SimplePostDTO} from '../../../core/model/swagger-model/simplePostDTO';
import {CacheService} from '../../../core/services/cache.service';
import {ConstantsService} from '../../../core/services/constants.service';
import {WorkoutService} from '../workout.service';
import {SavedWorkoutDTO} from '../../../core/model/swagger-model/savedWorkoutDTO';

@Component({
  selector: 'app-workout-post-footer',
  templateUrl: './workout-post-footer.component.html',
  styleUrls: ['./workout-post-footer.component.css']
})
export class WorkoutPostFooterComponent implements OnInit {

  @Input() workout: Workout;
  @Input() simplePost: SimplePostDTO;
  @Output() isCollapsedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  isCollapsed = true;
  toggleImage = 'assets/pictures/menuButtons/toggle_open.png';

  constructor(
    private cacheService: CacheService,
    private constants: ConstantsService,
    private workoutService: WorkoutService) {
  }

  ngOnInit(): void {
  }

  likeButtonImage(isLiked: boolean): string {
    return isLiked ? 'assets/pictures/menuButtons/like_active.svg' : 'assets/pictures/menuButtons/like_inactive.svg';
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

  expandContent(): void {
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      this.toggleImage = 'assets/pictures/menuButtons/toggle_open.png';
    } else {
      this.toggleImage = 'assets/pictures/menuButtons/toggle_close.png';
    }
    this.isCollapsedEvent.emit(this.isCollapsed);
  }
}
