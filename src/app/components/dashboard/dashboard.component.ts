import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { Company, CompanyService } from '../../services/company.service';
import { StockPriceService } from '../../services/stock-price.service';
import { Router } from '@angular/router';

export type MarketData = {
  companyId: number;
  companyName: string;
  latestPrice: number;
  priorPrice: number;
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

  constructor(
    private router: Router,
    private companyService: CompanyService,
    private priceService: StockPriceService
  ) { }

  ngOnInit(): void {
    this.marketDataEntries = [];
    this.sectorDataEntries = [];
    this.companyService.getAllCompanies().subscribe((companies: Company[]) => {
      companies.forEach(company => {
        this.priceService.getPriceHistory(company.id + '').subscribe((data: MarketData) => {
          this.marketDataEntries.push(data);
        });
      });
    });

    this.priceService.getSectorPrices().subscribe((data: SectorData[]) => {
      this.sectorDataEntries = data;
    });
  }

  goToChart(companyId: number) {
    this.router.navigate([`compare/${companyId}`]);
  }
}
