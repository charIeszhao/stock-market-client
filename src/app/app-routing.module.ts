import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { AuthGuard } from './core/auth/auth.guard';
import { AdminGuard } from './core/auth/admin.guard';
import { LoginComponent } from './components/login/login.component';
import { DataImportComponent } from './components/data-import/data-import.component';
import { CompanyManagementComponent } from './components/company-management/company-management.component';
import { ExchangeManagementComponent } from './components/exchange-management/exchange-management.component';
import { IpoUpdateComponent } from './components/ipo-update/ipo-update.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IpoCalendarComponent } from './components/ipo-calendar/ipo-calendar.component';
import { CompareChartsComponent } from './components/compare-charts/compare-charts.component';


const routes: Routes = [
  {
    path: 'admin',
    component: HomeLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        redirectTo: 'import',
        pathMatch: 'full'
      },
      {
        path: 'import',
        component: DataImportComponent
      },
      {
        path: 'company',
        component: CompanyManagementComponent
      },
      {
        path: 'exchange',
        component: ExchangeManagementComponent
      },
      {
        path: 'ipo',
        component: IpoUpdateComponent
      }
    ]
  },
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'ipo-calendar',
        component: IpoCalendarComponent
      },
      {
        path: 'compare',
        component: CompareChartsComponent
      },
      {
        path: 'compare/:id',
        component: CompareChartsComponent
      }
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'sign-up',
        component: SignUpComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
