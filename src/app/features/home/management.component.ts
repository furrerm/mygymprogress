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
import {ConstantsService} from '../../core/services/constants.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css', '../../shared/shared.style.css', '../workout-list/workout.component.css']
})
export class ManagementComponent implements OnInit {

  private _postPage: PageDTO;
  private lowestId: number;
  private counter = 0;
  private _postListings: PostListing[] = [];
  bntStyle = 'btn-default';

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
    private readonly sanitizer: DomSanitizer,
    private constants: ConstantsService) {
    this._postPage = null;
  }

  ngOnInit(): void {
    this.loadPostPage(-1, this.constants.loadingPattern[0]);
  }

  loadPostPage(id: number, pageSize: number): void {
    this.postService.getPosts(id, pageSize).subscribe(a => {
      const workoutConverter = new WorkoutConverter(this.sanitizer);
      this._postPage = a;
      this.postPage.posts.forEach(post => this._postListings.push({
        workout: post.workoutDTO ? workoutConverter.convertDTOToWorkout(post.workoutDTO) : null,
        simplePost: post.simplePostDTO ? post.simplePostDTO : null,
        isCollapsed: true,
        toggleImage: '../../assets/pictures/menuButtons/toggle_open.png'
      }));
      this.lowestId = a.highestUpdateId;
      ++this.counter;
      if (this.counter < this.constants.loadingPattern.length) {
        this.loadPostPage(this.lowestId, this.constants.loadingPattern[this.counter]);
      }
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
}
