import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CoinListComponent } from './components/coin-list/coin-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { SnowflakesComponent } from './components/snowflakes/snowflakes.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FloatingLogoComponent } from './components/floating-logo/floating-logo.component';
import { MainPageComponent } from './components/main-page/main-page.component';




@NgModule({
  declarations: [
    AppComponent,
    CoinListComponent,
    LoginComponent,
    SnowflakesComponent,
    HomePageComponent,
    FloatingLogoComponent,
    MainPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
