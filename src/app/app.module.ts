import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxEchartsModule } from 'ngx-echarts';

import { TokenInterceptor } from './core/auth/token.interceptor';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DataImportComponent } from './components/data-import/data-import.component';
import { CompanyManagementComponent } from './components/company-management/company-management.component';
import { ExchangeManagementComponent } from './components/exchange-management/exchange-management.component';
import { IpoUpdateComponent } from './components/ipo-update/ipo-update.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IpoCalendarComponent } from './components/ipo-calendar/ipo-calendar.component';
import { CompareChartsComponent } from './components/compare-charts/compare-charts.component';

import { SortableDirective } from './directives/sortable.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StockPriceChangePipe } from './pipes/stock-price-change.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    DataImportComponent,
    CompanyManagementComponent,
    ExchangeManagementComponent,
    IpoUpdateComponent,
    LoginLayoutComponent,
    HomeLayoutComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    IpoCalendarComponent,
    CompareChartsComponent,
    SortableDirective,
    StockPriceChangePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    NgxEchartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
