import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {graphic} from 'echarts';

@Component({
  selector: 'app-workout-position-chart',
  templateUrl: './workout-position-chart.component.html',
  styleUrls: ['./workout-position-chart.component.css']
})
export class WorkoutPositionChartComponent implements OnInit, OnChanges {

  @Input() timeLeft: number;
  @Input() totalTime: number;

  options = {

    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    series: [{
      name: 'Pressure',
      type: 'gauge',
      splitNumber: 6,
      max: 12,
      detail: {
        formatter: '{value}'
      },
      data: [{
        value: 9,

        title: {
          offsetCenter: [0, '-14%']
        },
        detail: {
          offsetCenter: [0, 30],
          fontSize: 40,
          formatter: () =>
            String(6 ) + ' / ' + String(12)
        }
      }],
      startAngle: 200,
      endAngle: -20,
      axisLine: {
        lineStyle: {
          width: 10,

          color: [[1, 'rgba(0, 0, 0, 0.5)']]

        }
      },
      axisTick: {
        show: false,
        distance: -10,

      },
      splitLine: {
        show: true,
        distance: -10
      },
      axisLabel: {
        show: true,
        fontSize: 8,
        distance: 15
      },
      pointer: {
        show: true
      },
      itemStyle: {},

    }]
  };

  updateOptions: any;


  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.updateOptions = {

      series: [
        {
          max: 11,
          data: [{
            value: 5,
            title: {
              offsetCenter: [0, '-14%']
            },
            detail: {
              offsetCenter: [0, 2],
              fontSize: 27,
              formatter: () =>
                String(6)

            }
          }]
        },
      ]
    };
  }
}
