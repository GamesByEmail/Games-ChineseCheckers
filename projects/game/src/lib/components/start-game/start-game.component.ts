import { Component, OnInit, Input } from '@angular/core';
import { teamConfigs } from './team-configs';
import { IMe, IStartTeamConfig } from '@gamesbyemail/base';
import { deepCopy } from '@packageforge/deep-copy';

@Component({
  selector: 'gamesbyemail-games-chinesecheckers-startgame',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent implements OnInit {
  constructor() { }
  @Input() me!: IMe;
  teamConfigs: IStartTeamConfig[] = deepCopy(teamConfigs);

  ngOnInit() {
  }

}
