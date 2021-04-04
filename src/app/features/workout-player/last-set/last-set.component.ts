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
  lastTwoSets: ExerciseSetContainerDTO[] = [];
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
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: [1, 2, 3],
        axisTick: {
          alignWithLabel: false
        },
        axisLabel: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Counters',
        type: 'bar',
        /*
        itemStyle: {
          normal: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: '#F3E412'},
              {offset: 0.5, color: '#928903'},
              {offset: 1, color: '#403C03'},
            ]),
          },
          emphasis: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: '#F3E412'},
              {offset: 0.7, color: '#928903'},
              {offset: 1, color: '#403C03'},
            ]),
          }
        },*/
        data: this.yAxe
      },
      {
        name: 'Counters2',
        type: 'bar',
        itemStyle: {
          /*
          normal: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: '#83bff6'},
              {offset: 0.5, color: '#188df0'},
              {offset: 1, color: '#188df0'},
            ]),
          },
          emphasis: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: '#2378f7'},
              {offset: 0.7, color: '#2378f7'},
              {offset: 1, color: '#83bff6'},
            ]),
          },*/
        },
        data: []
      }]
  };

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updatedExercise = this.currentExercise;
    if (this.updatedExercise) {
      this.lastTwoSets = this.createLastTwoSets();
      this.updateOptions = {
        xAxis: [
          {
            data: this.updatedExercise.setsContainer.map(a => a.timeOfExercise)
          }
        ],
        series: [
          {
            data: this.updatedExercise.setsContainer.slice(0, this.updatedExercise.setsContainer.length - 1)
              .map(a => a.exerciseSets.reduce((sum, b) => sum + b.repetitions, 0))
          },
          {
            data: this.updatedExercise.setsContainer.slice(0, this.updatedExercise.setsContainer.length - 1)
              .map(a => a.exerciseSets.reduce((sum, b) => sum + b.weight, 0))
          }
        ]
      };
    }
  }

  private createLastTwoSets(): ExerciseSetContainerDTO[] {
    const numberOfSetsMadeInThisExercise: number = this.currentExercise.setsContainer.length;
    const lastTwoSets: ExerciseSetContainerDTO[] = [];
    lastTwoSets.push(this.currentExercise.setsContainer[numberOfSetsMadeInThisExercise - 2]);
    lastTwoSets.push(this.currentExercise.setsContainer[numberOfSetsMadeInThisExercise - 3]);
    return lastTwoSets;
  }
}
