import { IBaseTerritorySave, BaseGridTerritory } from '@gamesbyemail/base';
import { Game, IGameOptions, IGameState, IGameSave } from './game';
import { Board, IBoardSave } from './board';
import { Team, ITeamSave } from './team';
import { TeamId } from './team-id';
import { Move, IModMove } from './move';

import { Piece, PieceChar } from './piece';

export interface ITerritorySave extends IBaseTerritorySave<Game, IGameOptions, IGameState, IGameSave, Board, IBoardSave, Territory, ITerritorySave, Team, TeamId, ITeamSave, Move, IModMove> {
  highlight: number | undefined;
  piece: Piece | undefined;
}

export class Territory extends BaseGridTerritory<Game, IGameOptions, IGameState, IGameSave, Board, IBoardSave, Territory, ITerritorySave, Team, TeamId, ITeamSave, Move, IModMove> {
  private _piece: Piece | undefined;
  homeId: TeamId | undefined;
  public get piece() {
    return this._piece;
  }
  constructor(board: Board, index: number) {
    super(board, index);
    this.homeId = this.board.homeIdFromIndex(this.index);
  }
  setPiece(piece?: Piece) {
    this._piece = piece;
  }
  highlight: number | undefined;
  clearFlags(team?: Team): void {
    super.clearFlags(team);
    this.highlight = undefined;
  }
  setState(state: string): string {
    const pieceChar: PieceChar | ' ' = <PieceChar | ' '>state.substr(0, 1);
    state = state.substr(1);
    const piece = pieceChar !== " " ? this.board.createPiece(pieceChar) : undefined;
    if (piece)
      piece.changeTerritory(this);
    else
      this.setPiece();
    return state;
  }
  getState(): string {
    return this.piece ? this.piece.getChar() : " ";
  }
  save() {
    super.save();
    this.piece && this.piece.save();
  }
  saving(): ITerritorySave {
    const saving = super.saving();
    saving.highlight = this.highlight;
    saving.piece = this.piece;
    return saving;
  }
  restore(depth: number) {
    super.restore(depth);
    this.piece && this.piece.restore(depth);
  }
  restoring(saved: ITerritorySave) {
    super.restoring(saved);
    this.highlight = saved.highlight;
    this._piece = saved.piece;
  }
  commit() {
    super.commit();
    this.piece && this.piece.commit();
  }

  isEmpty(): boolean {
    return this.piece === undefined;
  }
  isUs(team?: Team | TeamId): boolean {
    if (!this.piece)
      return false;
    if (team instanceof Team)
      return this.piece.team === team;
    return this.piece.team.id === team;
  }
  beginningMove() {
    super.beginningMove();
    this.highlight = undefined;
    this.piece && this.piece.beginningMove();
  }
}
