import {Component, ElementRef, ViewChild, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-workoutoverview',
  templateUrl: './workoutoverview.component.html',
  styleUrls: ['./workoutoverview.component.css']
})
export class WorkoutoverviewComponent implements AfterViewInit {
  @ViewChild('content', {static: true}) elementView: ElementRef;
  @ViewChild('menu', {static: true}) menuView: ElementRef;
  contentHeight: number;
  menuHeight: number;
  constructor() { }

  ngAfterViewInit() {
    this.contentHeight = this.elementView.nativeElement.offsetHeight;
    this.menuHeight = this.menuView.nativeElement.offsetHeight;
    console.log(this.contentHeight);
    console.log(this.menuHeight);
  }

}
