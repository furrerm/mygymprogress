import {Input} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {LastSetServiceService} from './last-set-service.service';


@Component({
  selector: 'app-last-set',
  templateUrl: './last-set.component.html',
  styleUrls: ['./last-set.component.css']
})
export class LastSetComponent implements OnInit {
  receivedSets: string;
  updatedExercise: string;

  @Input() set exercise(value: string) {
    this.updatedExercise = value;
    this.loadLastSet(value);
  }

  constructor(private lastSetService: LastSetServiceService) {
  }

  ngOnInit() {
  }

  getValue(): string {
    return this.updatedExercise;
  }

  loadLastSet(value: string) {
    this.lastSetService.getSets(value).subscribe(a => {
      this.receivedSets = a;
    });
  }
}
