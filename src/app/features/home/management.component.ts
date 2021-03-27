import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostsService} from './posts.service';
import {PageDTO} from '../../core/model/swagger-model/pageDTO';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {PostListing} from '../../core/model/internal-model/PostListing';
import {WorkoutConverter} from '../../core/model/converter/workout-converter';
import {WorkoutListing} from '../workout-list/workout-listing';
import {Day} from '../../core/model/internal-model/day.model';
import {Workout} from '../../core/model/internal-model/workout.model';
import {SavedWorkoutDTO} from '../../core/model/swagger-model/savedWorkoutDTO';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css', '../../shared/shared.style.css', '../workout-list/workout.component.css']
})
export class ManagementComponent implements OnInit {

  private _postPage: PageDTO;
  private _lastTimestamp: string;
  private _postListings: PostListing[] = [];
  bntStyle = 'btn-default';

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
    private readonly sanitizer: DomSanitizer) {
    this._postPage = null;
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(a => {
      const workoutConverter = new WorkoutConverter();
      this._postPage = a;
      this._postListings = this.postPage.posts.map(post => ({
        workout: post.workoutDTO ? workoutConverter.convertDTOToWorkout(post.workoutDTO) : null,
        simplePost: post.simplePostDTO ? post.simplePostDTO : null,
        isCollapsed: true,
        toggleImage: '../../assets/pictures/menuButtons/toggle_open.png'
      }));
    });
  }

  get postPage(): PageDTO {
    return this._postPage;
  }

  get postListings(): PostListing[] {
    return this._postListings;
  }

  saveUrl(base64Image: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }

  expandContent(set: PostListing): void {
    set.isCollapsed = !set.isCollapsed;
    if (set.isCollapsed) {
      set.toggleImage = '../../assets/pictures/menuButtons/toggle_open.png';
    } else {
      set.toggleImage = '../../assets/pictures/menuButtons/toggle_close.png';
    }
    this.bntStyle = 'btn-default2';
  }

  playDayWorkout(day: Day): void {
    console.log('play button pressed');
  }
  likeWorkout(workout: Workout): void {
    console.log('workout got liked');
  }
  likeButtonImage(isLiked: boolean): string {
    return isLiked ? 'assets/pictures/menuButtons/like_active.svg' : 'assets/pictures/menuButtons/like_inactive.svg';
  }
}
