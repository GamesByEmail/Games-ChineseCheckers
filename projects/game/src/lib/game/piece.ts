import { IBindableTarget, StateStore } from '@gamesbyemail/base';
import { Game } from './game';
import { Territory } from './territory';
import { Team } from './team';
import { TeamId } from './team-id';
import { ElementRef } from '@angular/core';
import { Rectangle2D } from '@packageforge/geometry2d';
import { IProjectedEntity } from '@packageforge/template-projection';
import { IPieceKey } from './i-piece-key';

export type PieceChar = 'r' | 'y' | 'g' | 'c' | 'b' | 'm';

export function teamIdFromChar(pieceChar: PieceChar): TeamId {
  return Object.values(TeamId).reduce((found: TeamId | undefined, id: TeamId) => found || (id.charAt(0).toLowerCase() === pieceChar ? id : undefined), undefined)!;
}

export interface IPieceSave {
  territory: number;
}

export class Piece implements IProjectedEntity, IBindableTarget {
  public getChar(): PieceChar {
    return <PieceChar>this.team.id.charAt(0).toLowerCase();
  }
  public get game(): Game {
    return this._game;
  }
  private _team: Team;
  public get team(): Team {
    return this._team;
  }
  private _territory: Territory | undefined;
  public get territory(): Territory | undefined {
    return this._territory;
  }
  public set territory(value: Territory | undefined) {
    if (this.elementRef)
      this.lastClientRect = new Rectangle2D(this.elementRef.nativeElement.getBoundingClientRect());
    this._territory = value;
  }
  private stateStore = new StateStore<IPieceSave>();
  constructor(private _game: Game, state: PieceChar) {
    this._team = this.game.findTeam(teamIdFromChar(state));
  }
  elementRef: ElementRef<SVGElement> | undefined;
  private lastClientRect: Rectangle2D | undefined;
  bindElement(elementRef: ElementRef<SVGElement>): Rectangle2D | undefined {
    if (this.elementRef && this.elementRef !== elementRef)
      this.unbindElement(this.elementRef);
    this.elementRef = elementRef;
    const r = this.lastClientRect;
    this.lastClientRect = undefined;
    return r;
  }
  unbindElement(elementRef: ElementRef<SVGElement>): void {
    if (this.elementRef === elementRef)
      this.elementRef = undefined;
  }
  getTemplateKey(key?: IPieceKey): IPieceKey {
    return {
      teamId:this.team.id,
    };
  }
  canMove(): boolean {
    return this.team.myTurn;
  }
  save(): IPieceSave {
    const saved = this.saving();
    this.stateStore.push(saved);
    return saved;
  }
  saving(): IPieceSave {
    return {
      territory: this.territory ? this.territory.index : -1
    };
  }
  restore(depth: number) {
    const saved = this.stateStore.pop(depth);
    this.restoring(saved);
  }
  restoring(saved: IPieceSave | undefined) {
    this.territory = saved && saved.territory >= 0 ? this.team.game.board.territories[saved.territory] : undefined;
  }
  commit() {
    this.stateStore.commit();
  }
  canMoveTo(toTerritory: Territory): boolean {
    return this.getPathTo(toTerritory,true).length>0;
  }
  getPathTo(toTerritory: Territory,quick?:boolean): number[] {
    if (!toTerritory.isEmpty())
      return [];
    const delta=this.territory!.delta(toTerritory);
    if (Math.abs(delta.x)<=1 && Math.abs(delta.y)<=1)
      return delta.x!==-delta.y ? [this.territory!.index,toTerritory.index] : [];
    if (Math.abs(delta.x)%2!==0 || Math.abs(delta.y)%2!==0)
      return [];
    return this.game.board.findPath(this.territory!,toTerritory,quick);
  }
  makeMove(toTerritory: Territory, logIt?: boolean): boolean {
    const path=this.getPathTo(toTerritory);
    if (path.length===0)
      return false;
    if (logIt)
      this.game.log({
        piece: this.getChar(),
        from: path.shift()!,
        to: path
      });
    this.changeTerritory(toTerritory);
    return true;
  }
  completeMove(fromTerritory: Territory): Promise<boolean> {
    return Promise.resolve(true);
  }
  attemptMove(toTerritory: Territory): Promise<boolean> {
    const fromTerritory = this.territory!;
    if (!this.makeMove(toTerritory, true))
      return Promise.resolve(false);
    return this.completeMove(fromTerritory);
  }
  changeTerritory(toTerritory: Territory | undefined): void {
    if (this.territory)
      this.territory.setPiece();
    this.territory = toTerritory;
    if (this.territory)
      this.territory.setPiece(this);
  }
  isUs(team?: Team): boolean {
    return team ? this.team === team : this.team.isUs();
  }
  replaceWith(replacement: Piece) {
    const territory = this.territory;
    this.changeTerritory(undefined);
    replacement.changeTerritory(territory);
    replacement.lastClientRect = this.lastClientRect;
  }
  beginningMove() {
  }
}
