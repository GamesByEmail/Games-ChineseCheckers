import { Component, Input, TemplateRef } from '@angular/core';
import { Game } from '../../../game/game';
import { PiecesComponent } from '../pieces/pieces.component';

@Component({
  selector: 'gamesbyemail-games-chinesecheckers-default-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent {
  @Input() game!: Game;
  @Input() pieces!: PiecesComponent;

  constructor() { }

  gridArea(index: number, bullet?: boolean): string {
    if (index === 0)
      return bullet ? "1 / 1" : "1 / 2 / 1 / " + this.game.teams.length;
    index--;
    const row = Math.floor(index / this.game.teams.length) + 2;
    const col = bullet ? 1 : index % this.game.teams.length + 2;
    return row + " / " + col;
  }
}
