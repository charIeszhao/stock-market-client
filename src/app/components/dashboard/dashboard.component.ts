import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';

export type MarketData = {
  companyName: string;
  lastPrice: number;
  priorDatePrice: number;
};

export type SectorData = {
  sectorName: string;
  changePct: number;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  options: EChartOption;
  marketDataEntries: MarketData[];
  sectorDataEntries: SectorData[];

  constructor() { }

  ngOnInit(): void {
    this.marketDataEntries = [
      { companyName: 'Company 1', lastPrice: 20.04, priorDatePrice: 20.11 },
      { companyName: 'Company 2', lastPrice: 1.63, priorDatePrice: 1.65 },
      { companyName: 'Company 3', lastPrice: 0.74, priorDatePrice: 0.72 },
      { companyName: 'Company 4', lastPrice: 0.95, priorDatePrice: 0.94 },
      { companyName: 'Company 5', lastPrice: 0.92, priorDatePrice: 0.94 }
    ];

    this.sectorDataEntries = [
      { sectorName: 'Energy', changePct: -0.46 },
      { sectorName: 'Financial', changePct: 0.33 },
      { sectorName: 'Health Care', changePct: 3.31 },
      { sectorName: 'Industrial', changePct: 1.89 },
      { sectorName: 'Information Technology', changePct: 4.17 }
    ];

    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 50; i++) {
      xAxisData.push('Week' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    this.options = {
      legend: {
        data: ['Company 1', 'Company 2'],
        bottom: 5,
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        splitLine: {
          show: false
        }
      },
      yAxis: {
        name: 'Stock Price',
        nameTextStyle: {
          fontSize: 18,
          fontWeight: 'bold'
        }
      },
      series: [{
        name: 'Company 1',
        type: 'bar',
        data: data1,
        animationDelay(idx) {
          return idx * 10;
        }
      }, {
        name: 'Company 2',
        type: 'bar',
        data: data2,
        animationDelay(idx) {
          return idx * 10 + 100;
        }
      }],
      animationEasing: 'elasticOut',
      animationDelayUpdate(idx) {
        return idx * 5;
      }
    };
  }

}
