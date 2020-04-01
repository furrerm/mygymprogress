import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  @Input() exercise;

  constructor() {
  }

  ngOnInit() {
  }

}
