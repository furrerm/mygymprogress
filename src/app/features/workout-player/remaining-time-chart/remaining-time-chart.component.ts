import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {graphic, EChartsOption} from 'echarts';

@Component({
  selector: 'app-remaining-time-chart',
  templateUrl: './remaining-time-chart.component.html',
  styleUrls: ['./remaining-time-chart.component.css']
})
export class RemainingTimeChartComponent implements OnInit, OnChanges {

  @Input() timeLeft: number;
  @Input() totalTime: number;

  options = {

    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    series: [{
      name: 'Pressure',
      type: 'gauge',
      max: 177,
      detail: {
        formatter: '{value}'
      },
      data: [{
        value: 90,
        name: 'Time Left',
        title: {
          offsetCenter: [0, '-14%']
        },
        detail: {
          offsetCenter: [0, 0],
          fontSize: 10,

        }
      }],
      startAngle: 90,
      endAngle: -269.9999,
      axisLine: {
        lineStyle: {
          width: 15,
          color: [[1, '#f6f8f6']]
          /*
          color: [[1, new graphic.RadialGradient(0.5, 0.5, 0.6, [
            {offset: 0.6, color: '#f6f8f6'},
            {offset: 0.95, color: '#dcdcd7'},
            {offset: 1, color: '#cecccc'},
          ])]]*/
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      pointer: {
        show: false
      },
      itemStyle: {},
      progress: {
        show: true,
        width: 15,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0.5,
            y: 0,
            x2: 0.5,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#f6f8f6' // color at 0% position
            }, {
              offset: 1, color: '#0e0d0d' // color at 100% position
            }],
            global: false // false by default
          },
          opacity: 1
        }
      }
    }]
  };

  updateOptions: any;


  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const timeDone = this.totalTime - this.timeLeft;
    this.updateOptions = {

      series: [
        {
          max: this.totalTime,
          data: [{
            value: timeDone,
            title: {
              offsetCenter: [0, '-14%']
            },
            detail: {
              offsetCenter: [0, 2],
              fontSize: 27,
              formatter: () =>
                String(this.timeLeft)

            }
          }]
        },
      ]
    };
  }
}
