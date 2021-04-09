import {HostListener, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {graphic, EChartsOption} from 'echarts';
import {ExerciseDTO} from '../../../core/model/swagger-model/exerciseDTO';
import {ExerciseSetContainerDTO} from '../../../core/model/swagger-model/exerciseSetContainerDTO';

@Component({
  selector: 'app-last-set',
  templateUrl: './last-set.component.html',
  styleUrls: ['./last-set.component.css']
})
export class LastSetComponent implements OnInit, OnChanges {
  updatedExercise: ExerciseDTO;
  xAxe: number[] = [];
  yAxe: number[] = [];
  @Input() currentExercise: ExerciseDTO;
  updateOptions: any;
  options: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      show: false,
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true
    },
    xAxis: [
      {
        show: true,
        type: 'category',
        data: [1, 2, 3],
        axisTick: {
          alignWithLabel: false
        },
        axisLabel: {
          show: false
        },

      }
    ],
    yAxis: [
      {
        type: 'value',

        splitLine: {
          show: false
        },
        position: 'right',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#f6838d'
          }
        },
        axisLabel: {
          formatter: '{value} kg'
        }
      },
      {
        type: 'value',
        splitLine: {
          show: false
        },

        position: 'left',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#83bff6'
          }
        },
        axisLabel: {
          formatter: '{value} reps'
        }
      }
    ],
    series: [


      {
        name: 'Repetitions',
        type: 'bar',
        yAxisIndex: 1,
        data: [120, 150, 180],
        itemStyle: {
          color: new graphic.LinearGradient(
            0, 0, 0, 1,
            [
              {offset: 0, color: '#83bff6'},
              {offset: 0.5, color: '#188df0'},
              {offset: 1, color: '#188df0'}
            ]
          )
        },
        emphasis: {
          itemStyle: {
            color: new graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#2378f7'},
                {offset: 0.7, color: '#2378f7'},
                {offset: 1, color: '#83bff6'}
              ]
            )
          }
        },
      },

      {
        name: 'Weight',
        type: 'bar',
        yAxisIndex: 0,
        data: [5, 24, 23],
        itemStyle: {
          color: new graphic.LinearGradient(
            0, 0, 0, 1,
            [
              {offset: 0, color: '#f6838d'},
              {offset: 0.5, color: '#ee3d4c'},
              {offset: 1, color: '#f0181f'}
            ]
          )
        },
        emphasis: {
          itemStyle: {
            color: new graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#f0181f'},
                {offset: 0.7, color: '#ee3d4c'},
                {offset: 1, color: '#f6838d'}
              ]
            )
          }
        },
      },
    ],
    /*
    series: [
      {
        name: 'Counters',
        type: 'bar',

        data: this.yAxe
      },
      {
        name: 'Counters2',
        type: 'bar',
        itemStyle: {

        },
        data: []
      }]*/
  };

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updatedExercise = this.currentExercise;
    if (this.updatedExercise) {

      this.updateOptions = {
        xAxis: [
          {
            data: this.updatedExercise.setsContainer.map(a => a.timeOfExercise)
          }
        ],
        series: [
          {
            data: this.updatedExercise.setsContainer
              .map(a => a.exerciseSets.reduce((sum, b) => sum + b.repetitions, 0))
          },
          {
            data: this.updatedExercise.setsContainer
              .map(a => a.exerciseSets.reduce((sum, b) => sum + b.weight, 0))
          }
        ]
      };
    }
  }
}
