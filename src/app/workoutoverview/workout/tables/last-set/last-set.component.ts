import {Input, OnChanges, SimpleChanges} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {Exercise, SetContainer} from '../../saved-workouts.Workout';
import {graphic} from 'echarts';

@Component({
  selector: 'app-last-set',
  templateUrl: './last-set.component.html',
  styleUrls: ['./last-set.component.css']
})
export class LastSetComponent implements OnInit, OnChanges {
  receivedSets: string;
  updatedExercise: Exercise;
  lastTwoSets: SetContainer[] = [];
  // sum: number;
  xAxe: number[] = [];
  yAxe: number[] = [];
  @Input() currentExercise: Exercise;
  updateOptions: any;
  options = {
    color: ['#3398DB'],
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
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: [1, 2, 3],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [{
      type: 'value'
    }],
    series: [
      {
        name: 'Counters',
        type: 'bar',
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
        },
        data: this.yAxe
      },
      {
        name: 'Counters2',
        type: 'bar',
        itemStyle: {
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
          },
        },
        data: []
      }]
  };

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updatedExercise = null;
    this.updatedExercise = this.currentExercise;
    if (this.updatedExercise) {
      const length: number = this.currentExercise.setsContainer.length;
      this.lastTwoSets.push(this.currentExercise.setsContainer[length - 2]);
      this.lastTwoSets.push(this.currentExercise.setsContainer[length - 3]);
      // this.options.xAxis[0].data = this.updatedExercise.setsContainer.map(a => a.timeOfExercise);
      // this.options.series[0].data = this.updatedExercise.setsContainer.map(a => a.exerciseSets.reduce((sum, b) => sum + b.repetitions, 0));
      this.options.xAxis[0].data = [1, 2, 3];
      this.options.series[0].data = [30, 40, 50];
      this.updateOptions = {
        xAxis: [
          {
            data: this.updatedExercise.setsContainer.map(a => a.timeOfExercise)
          }
        ],
        series: [
          {
            data: this.updatedExercise.setsContainer.slice(0, this.updatedExercise.setsContainer.length - 1).map(a => a.exerciseSets.reduce((sum, b) => sum + b.repetitions, 0))
          },
          {
            data: this.updatedExercise.setsContainer.slice(0, this.updatedExercise.setsContainer.length - 1).map(a => a.exerciseSets.reduce((sum, b) => sum + b.weight, 0))
          }
        ]
      };
    }
  }
}
