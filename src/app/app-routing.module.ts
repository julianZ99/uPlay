import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/components/login.component';
import { HomePageComponent } from './/modules/home-page/components/home-page.component';
import { MainPageComponent } from './modules/main-page/components/main-page.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomePageComponent },
  { path: 'main-page', component: MainPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
