import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateProjectionModule } from '@packageforge/template-projection';

import { BindElementModule, BoardService } from '@gamesbyemail/base';

import { BoardComponent } from './board/board.component';
import { LogComponent } from './log/log.component';
import { PiecesComponent } from './pieces/pieces.component';
import { EntriesComponent } from './log/entries/entries.component';

@NgModule({
  imports: [
    CommonModule,
    TemplateProjectionModule,
    BindElementModule
  ],
  declarations: [
    BoardComponent,
    LogComponent,
    PiecesComponent,
    EntriesComponent
  ],
  exports: [
    BoardComponent,
    LogComponent,
    PiecesComponent
  ],
  providers: [
    BoardService
  ]
})
export class BoardModule {
}
