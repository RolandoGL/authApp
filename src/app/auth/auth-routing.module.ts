import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { LoginPagesComponent } from './pages/login-pages/login-pages.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const routes: Routes = [
  {
    path:'',
    component: AuthLayoutComponent,
    children:[
      { path:'login', component: LoginPagesComponent },
      { path:'register', component: RegisterPageComponent },
      { path:'**', redirectTo:'login'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
