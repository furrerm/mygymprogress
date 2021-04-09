import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {graphic} from 'echarts';
import {TablesComponent} from '../tables.component';

@Component({
  selector: 'app-workout-position-chart',
  templateUrl: './workout-position-chart.component.html',
  styleUrls: ['./workout-position-chart.component.css']
})
export class WorkoutPositionChartComponent implements OnInit, OnChanges {

  @Input() tableComponent: TablesComponent;
  private totalExercises = 0;
  private currentExerciseNumber = 0;

  options = {

    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    series: [{
      name: 'Pressure',
      type: 'gauge',
      max: this.totalExercises,
      splitNumber: 1,
      detail: {
        formatter: '{value}'
      },
      data: [{
        value: this.currentExerciseNumber,

        title: {
          offsetCenter: [0, '-14%']
        },

        detail: {
          show: true,
          offsetCenter: [0, 15],
          fontSize: 15,
          color: '#000000',
          formatter: () =>
            String(this.currentExerciseNumber)
        }
      }],
      startAngle: 200,
      endAngle: -20,
      axisLine: {
        lineStyle: {
          width: 10,
          color: [[1, new graphic.RadialGradient(0.5, 0.75, 0.68, [
            {offset: 0.88, color: '#111111'},
            {offset: 0.98, color: '#f3f3ed'},
            {offset: 1, color: '#100f0f'},
          ])]]
        }
      },
      axisTick: {
        show: false,
        distance: -10,

      },
      splitLine: {
        show: true,
        distance: -10,
        lineStyle: {
          width: 1,
          color: '#000000'
        }
      },
      pointer: {
        show: true,
        offsetCenter: [0, 0],
        icon: 'triangle',

        itemStyle: {

          color: '#000000',

        }
      },
      axisLabel: {
        show: true,
        fontSize: 10,
        distance: -12
      },
      itemStyle: {},

    }]
  };

  updateOptions: any;


  constructor() {
  }

  ngOnInit(): void {
    this.totalExercises = this.tableComponent.getTotalExercises();
    this.currentExerciseNumber = this.tableComponent.getCurrentExerciseNumber();
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.totalExercises = this.tableComponent.getTotalExercises();
    this.currentExerciseNumber = this.tableComponent.getCurrentExerciseNumber();

    this.updateOptions = {

      series: [
        {
          max: this.totalExercises,
          data: [{
            value: this.currentExerciseNumber,

            title: {
              offsetCenter: [0, '-14%']
            },

            detail: {
              show: true,
              offsetCenter: [0, 15],
              fontSize: 15,
              color: '#000000',
              formatter: () =>
                String(this.currentExerciseNumber)
            }
          }],
        },
      ]
    };
  }

}
