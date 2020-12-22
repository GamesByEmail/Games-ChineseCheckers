import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayComponent } from './play.component';

import { BoardModule } from '../../boards/default/board.module';

@NgModule({
  imports: [
    CommonModule,
    BoardModule
  ],
  declarations: [
    PlayComponent
  ],
  exports: [
    PlayComponent
  ]
})
export class PlayModule { }
