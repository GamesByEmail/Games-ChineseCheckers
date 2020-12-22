import { Component, Input } from '@angular/core';
import { IMe, IStartGame } from '@gamesbyemail/base';

@Component({
  selector: 'gamesbyemail-games-chinesecheckers-joingame',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent {

  @Input() me!: IMe;
  @Input() game!:IStartGame;

  constructor() { }

}
