import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-compare-charts',
  templateUrl: './compare-charts.component.html',
  styleUrls: ['./compare-charts.component.scss']
})
export class CompareChartsComponent implements OnInit {

  options: EChartOption;
  data: any;

  constructor() {
    this.data = {
      xAxisData: [],
      series: [],
      legend: []
    };
  }

  ngOnInit(): void {
    const seriesData = [];

    for (let i = 0; i < 50; i++) {
      this.data.xAxisData.push('Week' + i);
      seriesData.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }
    this.data.series.push(
      {
        name: 'Company 1',
        type: 'bar',
        data: seriesData,
        animationDelay(idx) {
          return idx * 20;
        }
      }
    );

    this.options = {
      legend: {
        data: ['Company 1'],
        bottom: 5,
      },
      tooltip: {},
      xAxis: {
        data: this.data.xAxisData,
        splitLine: {
          show: false
        }
      },
      yAxis: {
        name: 'Stock Price',
        nameTextStyle: {
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      series: this.data.series,
      animationEasing: 'elasticOut',
      animationDelayUpdate(idx) {
        return idx * 5;
      }
    };
  }

  addChartSeries(id) {
    const seriesData = [];
    for (let i = 0; i < 50; i++) {
      seriesData.push(id % 2 === 0 ?
        (Math.sin(i / (5 + id)) * (i / (5 + id) - 10) + i / (6 + id)) * (5 + id) :
        (Math.cos(i / (5 + id)) * (i / (5 + id) - 10) + i / (6 + id)) * (5 + id)
      );
    }
    this.data.series.push(
      {
        name: 'Company' + id,
        type: 'bar',
        data: seriesData,
        animationDelay(idx) {
          return idx * 100;
        }
      }
    );
  }

}
