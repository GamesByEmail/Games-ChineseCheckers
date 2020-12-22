import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateProjectionModule } from '@packageforge/template-projection';

import { RulesModule as BaseRulesModule } from '@gamesbyemail/base';

import { BoardModule } from '../../boards/default/board.module';

import { RulesComponent } from './rules.component';


@NgModule({
  imports: [
    CommonModule,
    TemplateProjectionModule,
    BaseRulesModule,
    BoardModule
  ],
  declarations: [
    RulesComponent
  ],
  exports: [
    RulesComponent
  ]
})
export class RulesModule {
}
