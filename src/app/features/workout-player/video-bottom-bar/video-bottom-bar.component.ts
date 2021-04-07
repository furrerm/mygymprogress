import {Component, Input, OnInit} from '@angular/core';
import {TablesComponent} from '../tables.component';

@Component({
  selector: 'app-video-bottom-bar',
  templateUrl: './video-bottom-bar.component.html',
  styleUrls: ['./video-bottom-bar.component.css']
})
export class VideoBottomBarComponent implements OnInit {

  @Input() videoHandler: TablesComponent;

  constructor() { }

  ngOnInit(): void {
  }

}
