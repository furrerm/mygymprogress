import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {SimplePostDTO} from '../../core/model/swagger-model/simplePostDTO';
import {PostHelper} from '../post-helper';

@Component({
  selector: 'app-simple-post-presentation',
  templateUrl: './simple-post-presentation.component.html',
  styleUrls: ['./simple-post-presentation.component.css']
})
export class SimplePostPresentationComponent implements OnInit {

  @Input() simplePostDTO: SimplePostDTO;
  postHelper: PostHelper;

  constructor(private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    this.postHelper = new PostHelper(this.sanitizer);
  }


}
