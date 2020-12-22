import { IBaseTeamSave, BaseTeam } from '@gamesbyemail/base';
import { Game, IGameOptions, IGameState, IGameSave } from './game';
import { Board, IBoardSave } from './board';
import { Territory, ITerritorySave } from './territory';
import { TeamId } from './team-id';
import { Move, IModMove } from './move';

export interface ITeamSave extends IBaseTeamSave<Game, IGameOptions, IGameState, IGameSave, Board, IBoardSave, Territory, ITerritorySave, Team, TeamId, ITeamSave, Move, IModMove> {
}

export class Team extends BaseTeam<Game, IGameOptions, IGameState, IGameSave, Board, IBoardSave, Territory, ITerritorySave, Team, TeamId, ITeamSave, Move, IModMove> {
  constructor(game: Game, id: TeamId) {
    super(game, id);
  }
  get title(): string {
    return this.id;
  }
}

