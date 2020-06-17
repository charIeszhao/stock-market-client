import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Price, StockPriceService } from '../../services/stock-price.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../services/company.service';

interface SeriesData {
  seriesData: any[];
  xAxisData: string[];
}

interface SelectOption {
  id: number;
  name: string;
}

@Component({
  selector: 'app-compare-charts',
  templateUrl: './compare-charts.component.html',
  styleUrls: ['./compare-charts.component.scss']
})
export class CompareChartsComponent implements OnInit {

  compareForm: FormGroup;
  options: EChartOption;
  data: SeriesData;

  sourceDropDownData: SelectOption[];
  targetDropDownData: SelectOption[];

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private priceService: StockPriceService,
    private companyService: CompanyService,
  ) { }

  ngOnInit(): void {
    const companyId = this.activatedRoute.snapshot.params.id;
    this.resetChart();

    this.compareForm = this.fb.group({
      sourceCompanyId: companyId ? [companyId] : [''],
      targetCompanyId: [''],
      startDate: [''],
      endDate: ['']
    });

    if (companyId) {
      this.getChartData(companyId);
    }

    this.companyService.getAllCompanies().subscribe(companies => {
      const options = companies.map(company => ({ id: company.id, name: company.name }));
      this.sourceDropDownData = [... options];
      this.targetDropDownData = [... options];
    });
  }

  onSelectSourceCompany(event) {
    // tslint:disable-next-line:triple-equals
    this.targetDropDownData = this.sourceDropDownData.filter(option => option.id != event.target.value);
    this.onChange();
  }

  onSelectTargetCompany() {
    this.onChange();
  }

  onChange() {
    const sourceCompanyId = this.compareForm.get('sourceCompanyId').value;
    const targetCompanyId = this.compareForm.get('targetCompanyId').value;
    let startDate = this.compareForm.get('startDate').value;
    let endDate = this.compareForm.get('endDate').value;
    if (startDate && endDate) {
      startDate = moment(`${startDate.year}-${startDate.month}-${startDate.day}`, 'YYYY-MM-DD').format('YYYY-MM-DDTHH:mm:ssZZ');
      endDate = moment(`${endDate.year}-${endDate.month}-${endDate.day}`, 'YYYY-MM-DD').format('YYYY-MM-DDTHH:mm:ssZZ');
    }
    this.getChartData(sourceCompanyId, startDate, endDate);
    this.getChartData(targetCompanyId, startDate, endDate);
  }

  getChartData(companyId, startDate?, endDate?) {
    if (companyId) {
      this.resetChart();
      this.priceService.getPricesByCompanyId(companyId, startDate, endDate).subscribe((prices: Price[]) => {
        if (prices && prices.length) {
          if (this.data.xAxisData.length === 0) {
            this.data.xAxisData = prices.map(price => moment(price.dateTime).format('DD/MM hh:mm'));
          }
          this.data.seriesData.push(
            {
              name: prices[0].company.name,
              series: prices.map(price => price.price)
            });

          this.renderChart();
        }
      });
    }
  }

  renderChart(): void {
    const options = {
      legend: {
        data: this.data.seriesData.map(data => data.name),
        bottom: 5,
      },
      tooltip: {},
      xAxis: {
        data: this.data.xAxisData || [],
        splitLine: {
          show: false
        }
      },
      yAxis: {
        name: 'Stock Price',
        nameTextStyle: {
          fontSize: 18
        }
      },
      series: [],
      animationEasing: 'elasticOut',
      animationDelayUpdate(idx) {
        return idx * 5;
      }
    };

    options.series = this.data.seriesData.map(data => ({
        name: data.name,
          type: 'bar',
          data: data.series,
          animationDelay(idx) {
            return idx * 10;
          }
      })
    );

    this.options = options;
  }

  resetChart() {
    this.data = {
      seriesData: [],
      xAxisData: []
    };
    this.options = {};
  }

}
