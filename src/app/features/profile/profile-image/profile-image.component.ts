import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.css']
})
export class ProfileImageComponent implements OnInit {

  @Input() saveImageUrl: SafeResourceUrl;
  @Output() activateSettingsEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  activateSettings(): void {
    this.activateSettingsEvent.emit(true);
  }
}
