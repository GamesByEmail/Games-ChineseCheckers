import { Component, OnInit } from '@angular/core';
import { IGameData } from '@gamesbyemail/base';
import { Game, IGameOptions, IGameState } from '../../game/game';
import { TeamId } from '../../game/team-id';

@Component({
  selector: 'gamesbyemail-games-chinesecheckers-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  game: Game = new Game();
  constructor() {
  }

  ngOnInit() {
    const gameData: IGameData<IGameOptions, IGameState, TeamId> = {
      over: false,
      players: [
        { title: "Ravid", id: "ASDFASDF" },
        { title: "Yavid", id: "ASDFASDF" },
        { title: "Gavid", id: "ASDFASDF" },
        { title: "Cavid", id: "ASDFASDF" },
        { title: "Bavid", id: "ASDFASDF" },
        { title: "Jennifer", id: "ASDFASDF" }
      ],
      options: {
        jumpMultiplier: true
      },
      perspective: TeamId.Red,
      //perspective: TeamId.Yellow,
      //perspective: TeamId.Green,
      //perspective: TeamId.Cyan,
      //perspective: TeamId.Blue,
      //perspective: TeamId.Magenta,
      states: [
        {
          moveNumber: 0,
          //board: "rrrrrrrrrr                                                                                                     cccccccccc",
          //board: "rrrrrrrrrr                                                       g        bgg       bbggg      bbbgggg     bbbb          ",
          //board: "rrrrrrrrrryyyy         yyy         yy         y                           b         bb         bbb         bbbbcccccccccc",
          //board: "rrrrrrrrrryyyy         yyy         yy         y                  g        bgg       bbggg      bbbgggg     bbbbcccccccccc",
          //board: "rrrrrrrrrryyyy     mmmmyyy      mmmyy       mmy        m         g        bgg       bbggg      bbbgggg     bbbbcccccccccc",
          board: " c c  bccgbb   m   cgg bb   c   ggg bb   ccc gb mm     y   m    ymmc     yb      r  gy m  mbg  y y mm      yyyyrgrrrrrrrr",
          teams: [
            '@',
            '',
            '',
            '',
            '',
            ''
          ],
          moves: []
        }
        //,{"moveNumber":1,"board":" c c   ccgbb   bm  cgg bb   c   ggg  b   cc  gbbmm     y   m   cy mc     yb m        y m  mbg ygy  mm   r ryyyyrgr rrrrrr","teams":["","","","","@",""],"moves":[{"piece":"b","from":6,"to":[15],"id":TeamId.Blue}]},
        //,{"moveNumber":2,"board":"  c c  ccgbb   bm  cgggbb b c   gg   b   cc  gb mm     y   m   cy mc     y  m       by m  mbg  ygy mm   r ryyyyrgr rrrrrr","teams":["","","","","@",""],"moves":[{"piece":"c","from":1,"to":[2],"id":TeamId.Cyan}]}
      ]
    };
    this.game.setGameData(gameData);
  }

}
