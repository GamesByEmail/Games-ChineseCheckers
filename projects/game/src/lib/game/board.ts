import { IPoint2D } from '@packageforge/geometry2d';
import { BaseGridBoard, IBaseBoardSave, HexHelper } from '@gamesbyemail/base';
import { Game, IGameOptions, IGameState, IGameSave } from './game';
import { Team, ITeamSave } from './team';
import { Territory, ITerritorySave } from './territory';
import { TeamId } from './team-id';
import { Move, IModMove } from './move';
import { Piece, PieceChar } from './piece';

export interface IBoardSave extends IBaseBoardSave<Game, IGameOptions, IGameState, IGameSave, Board, IBoardSave, Territory, ITerritorySave, Team, TeamId, ITeamSave, Move, IModMove> {
}
export class Board extends BaseGridBoard<Game, IGameOptions, IGameState, IGameSave, Board, IBoardSave, Territory, ITerritorySave, Team, TeamId, ITeamSave, Move, IModMove>  {
  public controller: any;
  constructor(game: Game) {
    super(game);
    for (let i = 0; i < 121; i++)
      this._territories[i] = new Territory(this, i);
    Object.freeze(this._territories);
    HexHelper.calculateAdjacents(this.territories);
  }
  positionFromIndex(index: number): IPoint2D {
    if (index === 0) return { x: 4, y: 0 };
    if (index >= 1 && index <= 2) return { x: 4 + index - 1, y: 1 };
    if (index >= 3 && index <= 5) return { x: 4 + index - 3, y: 2 };
    if (index >= 6 && index <= 9) return { x: 4 + index - 6, y: 3 };
    if (index >= 10 && index <= 22) return { x: 0 + index - 10, y: 4 };
    if (index >= 23 && index <= 34) return { x: 1 + index - 23, y: 5 };
    if (index >= 35 && index <= 45) return { x: 2 + index - 35, y: 6 };
    if (index >= 46 && index <= 55) return { x: 3 + index - 46, y: 7 };
    if (index >= 56 && index <= 64) return { x: 4 + index - 56, y: 8 };
    if (index >= 65 && index <= 74) return { x: 4 + index - 65, y: 9 };
    if (index >= 75 && index <= 85) return { x: 4 + index - 75, y: 10 };
    if (index >= 86 && index <= 97) return { x: 4 + index - 86, y: 11 };
    if (index >= 98 && index <= 110) return { x: 4 + index - 98, y: 12 };
    if (index >= 111 && index <= 114) return { x: 9 + index - 111, y: 13 };
    if (index >= 115 && index <= 117) return { x: 10 + index - 115, y: 14 };
    if (index >= 118 && index <= 119) return { x: 11 + index - 118, y: 15 };
    if (index === 120) return { x: 12 + index - 120, y: 16 };
    throw ("Index out of range " + index);
  }
  homeIdFromIndex(index: number): TeamId | undefined {
    const teamIds = <TeamId[]>Object.values(TeamId);
    for (let i = 0; i < teamIds.length; i++)
      if (homeIndeces[teamIds[i]].indexOf(index) >= 0)
        return teamIds[i];
    return;
  }
  isHomeFilled(teamId: TeamId): boolean {
    const indeces = homeIndeces[teamId];
    for (let i = 0; i < indeces.length; i++)
      if (!this.territories[indeces[i]].isUs(teamId))
        return false;
    return true;
  }
  calculateRotation(id: TeamId): number {
    if (id === TeamId.Red) return 0;
    if (id === TeamId.Yellow) return 300;
    if (id === TeamId.Green) return 240;
    if (id === TeamId.Cyan) return 180;
    if (id === TeamId.Blue) return 120;
    return 60;
  }
  createPiece(state: PieceChar): Piece {
    return new Piece(this.game, state);
  }
  findJumpInDirection(from: Territory, direction: number, jumper: Territory): Territory | undefined {
    let distance = 0;
    let territory: Territory | undefined = from;
    do {
      distance++;
      if (distance > 1 && !this.game.options.jumpMultiplier)
        return;
      territory = territory.adjacents[direction];
      if (!territory)
        return;
    } while (territory === jumper || territory.isEmpty());
    while (distance > 0) {
      distance--;
      territory = territory.adjacents[direction];
      if (!territory || (territory !== jumper && !territory.isEmpty()))
        return;
    }
    return territory;
  }
  findPath(from: Territory, to: Territory, quick?: boolean): number[] {
    let bestPath: number[] = [];
    const path = [from.index];
    const direction = [0];
    let index = 0;
    while (index >= 0) {
      while (direction[index] < 6) {
        const jump = this.findJumpInDirection(this.territories[path[index]], direction[index]++, from);
        if (jump && path.indexOf(jump.index) < 0) {
          path.push(jump.index);
          direction.push(0);
          index++;
          if (jump === to) {
            if (quick)
              return path;
            if (bestPath.length === 0 || path.length < bestPath.length)
              bestPath = path.slice(0);
          }
          break;
        }
      }
      if (direction[index] === 6) {
        path.pop();
        direction.pop();
        index--;
      }
    }
    return bestPath;
  }
}
let homeIndeces: { [key: string]: number[] } = {};
homeIndeces[<string>TeamId.Red] = [111, 112, 113, 114, 115, 116, 117, 118, 119, 120];
homeIndeces[<string>TeamId.Yellow] = [74, 84, 85, 95, 96, 97, 107, 108, 109, 110];
homeIndeces[<string>TeamId.Green] = [19, 20, 21, 22, 32, 33, 34, 44, 45, 55];
homeIndeces[<string>TeamId.Cyan] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
homeIndeces[<string>TeamId.Blue] = [10, 11, 12, 13, 23, 24, 25, 35, 36, 46];
homeIndeces[<string>TeamId.Magenta] = [65, 75, 76, 86, 87, 88, 98, 99, 100, 101];
