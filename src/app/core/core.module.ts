import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { AdminGuard } from './auth/admin.guard';

@NgModule({
  imports: [
    AuthModule,
    CommonModule
  ],
  declarations: [],
  providers: [
    AdminGuard,
    AuthGuard,
    AuthService
  ]
})
export class CoreModule { }
