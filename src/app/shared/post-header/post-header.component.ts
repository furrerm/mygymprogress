import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {UserDTO} from '../../core/model/swagger-model/userDTO';

@Component({
  selector: 'app-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.css']
})
export class PostHeaderComponent implements OnInit {

  @Input() creator: UserDTO;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  saveUrl(base64Image: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }
}
