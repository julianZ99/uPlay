import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouletteComponent } from './roulette/roulette.component';



@NgModule({
  declarations: [
    RouletteComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RouletteComponent
  ]
})
export class GamesModule { }
