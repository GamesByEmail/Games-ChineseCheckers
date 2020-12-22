import { BaseGame, IBaseGameSave, IBaseGameState } from '@gamesbyemail/base';
import { Board, IBoardSave } from './board';
import { Team, ITeamSave } from './team';
import { Territory, ITerritorySave } from './territory';
import { TeamId } from './team-id';
import { Move, IModMove, isIMove } from './move';

export interface IGameOptions {
  jumpMultiplier?: boolean;
}
export interface IGameState extends IBaseGameState<Game, IGameOptions, IGameState, IGameSave, Board, IBoardSave, Territory, ITerritorySave, Team, TeamId, ITeamSave, Move, IModMove> {
  board: string;
  teams: string[];
  moves: Move[];
}

export interface IGameSave extends IBaseGameSave<Game, IGameOptions, IGameState, IGameSave, Board, IBoardSave, Territory, ITerritorySave, Team, TeamId, ITeamSave, Move, IModMove> {
  header: string;
}
export class Game extends BaseGame<Game, IGameOptions, IGameState, IGameSave, Board, IBoardSave, Territory, ITerritorySave, Team, TeamId, ITeamSave, Move, IModMove> {
  header: string = ""; //??
  constructor() {
    super();
    this._board = new Board(this);
    this._teams.push(new Team(this, TeamId.Red));
    this._teams.push(new Team(this, TeamId.Yellow));
    this._teams.push(new Team(this, TeamId.Green));
    this._teams.push(new Team(this, TeamId.Cyan));
    this._teams.push(new Team(this, TeamId.Blue));
    this._teams.push(new Team(this, TeamId.Magenta));
    Object.freeze(this._teams);
  }

  public setState(state: IGameState) {
    super.setState(state);
    if (this.lastMoves.length > 0) {
      const move = this.lastMoves[0];
      if (isIMove(move)) {
        this.board.territories[move.from].highlight = 0;
        for (let i = 0; i < move.to.length; i++)
          this.board.territories[move.to[i]].highlight = i + 1;
      }
    }
  }

  public incrementTurn() {
    const turnTeam = this.findTurnTeam()!;
    turnTeam.myTurn = false;
    if (this.board.isHomeFilled(turnTeam.id)) {
      this._over = true;
    } else {
      const opponent = turnTeam.getNext()!;
      if (opponent)
        opponent.myTurn = true;
    }
    const state = this.commit();
    //console.log(JSON.stringify(state));
    this.setState(state);
  }
}
