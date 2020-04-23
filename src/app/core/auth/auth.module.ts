import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';
import { getAccessToken } from './auth.service';

@NgModule({
  imports: [
    CommonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getAccessToken,
        whitelistedDomains: ['localhost:8080'],
        headerName: 'Token',
        authScheme: ''
      }
    })
  ],
  declarations: []
})
export class AuthModule { }
