import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', 
  loadChildren: () => import('./modules/home-page/home-page.module').then((m) => m.HomePageModule),
},
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'main-page',
    loadChildren: () => import('./modules/main-page/main-page.module').then((m) => m.MainPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
