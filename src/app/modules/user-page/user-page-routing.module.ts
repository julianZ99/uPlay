import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPageComponent } from './components/user-page.component';

const mainPageRoutes: Routes = [
  { path: 'user-page', component: UserPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(mainPageRoutes)],
  exports: [RouterModule]
})
export class UserPageRoutingModule { }