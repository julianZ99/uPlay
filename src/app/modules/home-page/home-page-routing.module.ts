import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page.component';

const homePageRoutes: Routes = [
  { path: '', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(homePageRoutes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }