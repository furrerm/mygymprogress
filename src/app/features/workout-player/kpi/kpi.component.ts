import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Kpi} from '../dashboard/dashboard.component';

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.css']
})
export class KpiComponent implements OnInit, OnChanges{

  @Input() kpi: Kpi;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}
