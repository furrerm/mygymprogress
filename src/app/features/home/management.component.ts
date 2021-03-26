import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostsService} from './posts.service';
import {PageDTO} from '../../core/model/swagger-model/pageDTO';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  private _postPage: PageDTO;

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
    private readonly sanitizer: DomSanitizer) {
    this._postPage = null;
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(a => {
      console.log(a);
      this._postPage = a;
    });
  }

  get postPage(): PageDTO {
    return this._postPage;
  }

  saveUrl(base64Image: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }
}
