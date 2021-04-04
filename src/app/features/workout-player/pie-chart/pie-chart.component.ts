import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Exercise} from '../../../core/model/internal-model/exercise.model';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit, OnChanges {

  @Input() currentExercise: Exercise;

  options = {
    title: {
      text: 'Customized Pie',
      left: 'center',
      top: 20,
      textStyle: {
        color: '#171515'
      }
    },
    tooltip: {
      trigger: 'item'
    },

    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['35%', '74%'],
        center: ['50%', '50%'],


        label: {
          color: 'rgb(7,7,7)',
        },
        labelLine: {
          lineStyle: {
            color: 'rgba(10,10,10)'
          },
          smooth: 1,
          length: 10,
          length2: 20
        },
        data: [

        ],
        roseType: 'radius',
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

        },

        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: (idx) => {
          return Math.random() * 200;
        }

      }
    ]
  };
  optionsToMerge;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.optionsToMerge = {

      series: [
        {
          data: this.currentExercise.muscleTarget,
        }]
    };
  }
}
