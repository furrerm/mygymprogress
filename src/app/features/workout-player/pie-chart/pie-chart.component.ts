import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Exercise} from '../../../core/model/internal-model/exercise.model';
import {NamedNumber} from '../../../core/model/internal-model/NamedNumber';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit, OnChanges {

  @Input() namedNumbers: NamedNumber[];
  @Input() title: string;
  // namedNumbers: NamedNumber[] = [{name: 'Leg', value: 40}, {name: 'Arm', value: 35}, {name: 'Back', value: 25}];
  private itemStyle = {
    normal: {
      opacity: 0.7,

      borderWidth: 1,
      borderColor: '#000000'
    }
  };
  options = {
    /*
    xAxis: {
      splitLine: {
        lineStyle: {
          width: 20
        }
      }
    },*/
    visualMap: {
      show: false,
      type: 'piecewise',
      splitNumber: 20,
      min: 0,
      max: 100,
      inRange: {
        color: ['#f87500', '#ffff00', '#00ff00',
          '#00ffff', '#0000ff', '#ff00ff',
          '#ff0000', '#ffb400', '#78fa78',
          '#ff78ff'],

      }
    },
    tooltip: {
      trigger: 'item'
    },

    series: [
      {
        type: 'pie',
        radius: ['58%', '65%'],
        center: ['50%', '50%'],


        label: {
          color: 'rgb(7,7,7)',
        },
        labelLine: {
          show: true,
          lineStyle: {
            color: 'rgba(10,10,10)'
          },
          smooth: 1,
          length: 3,
          length2: 5
        },

        // roseType: 'radius',
        /* itemStyle: {

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

        },*/
        itemStyle: this.itemStyle,

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
      title: {
        text: this.title,
        left: 'center',
        top: 5,

        textStyle: {
          color: '#171515',
          fontSize: 15,
        }
      },
      series: [
        {
          data: this.namedNumbers,
        }]
    };
  }
}
