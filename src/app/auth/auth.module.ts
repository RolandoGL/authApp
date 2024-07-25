import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPagesComponent } from './pages/login-pages/login-pages.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [

    LoginPagesComponent,
       RegisterPageComponent,
       AuthLayoutComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
