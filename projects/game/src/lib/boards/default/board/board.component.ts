import { Component, Input, ElementRef, ViewChild, AfterViewInit, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { fromEvent, Subscription, Observable, Subject, race, BehaviorSubject } from 'rxjs';
import { switchMap, map, takeUntil } from 'rxjs/operators';
import { Point2D, Rectangle2D } from '@packageforge/geometry2d';

import { BoardService, HexHelper, IHexSize } from '@gamesbyemail/base';

import { Territory } from '../../../game/territory';
import { Game } from '../../../game/game';
import { TeamId } from '../../../game/team-id';
import { Team } from '../../../game/team';
import { isIMove, Move } from '../../../game/move';

@Component({
  selector: 'gamesbyemail-games-chinesecheckers-default-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements AfterViewInit {
  @Input() game!: Game;
  @ViewChild('boardArea') boardArea!: ElementRef<SVGElement>;

  mousemove: Observable<MouseEvent> = <any>fromEvent(document, 'mousemove');
  mouseup: Observable<any> = fromEvent(document, 'mouseup').pipe(map(() => undefined));
  territoryUp: Subject<Territory> = new Subject<Territory>();
  territoryOver: BehaviorSubject<IOverTerritory | undefined> = new BehaviorSubject<IOverTerritory | undefined>(undefined);

  size: IHexSize = HexHelper.extrapolateHexSize(31);
  viewBox: Rectangle2D=new Rectangle2D(0,0,10,10);
  constructor(private cd: ChangeDetectorRef, private boardService: BoardService) {
  }
  subscription!: Subscription;
  ngAfterViewInit() {
    this.game.board.controller = this;
    this.viewBox = HexHelper.getHexViewBox(this.size, this.game.board.rotation, this.game.board.territories).grow(2, 2, true);
    this.cd.detectChanges();
  }
  get perspectiveTeam() {
    return this.game.findTeam(this.game.perspective);
  }
  getTitleIndex(team: Team): number {
    return Object.values(TeamId).indexOf(team.id);
  }
  getTitleTransform(delta: number): string {
    const midX = 0.8;
    const midY = 0.5;
    const wingX = 0.2;
    const wingY = 3.2;
    if (delta === 0) return "translate(" + (this.viewBox.width / 2 + this.size.size * midX) + " " + (this.viewBox.height - this.size.size * midY) + ")";
    if (delta === 1) return "translate(" + (this.size.size * wingX) + " " + (this.viewBox.height - this.size.size * wingY) + ")";
    if (delta === 2) return "translate(" + (this.size.size * wingX) + " " + (this.size.size * wingY) + ")";
    if (delta === 3) return "translate(" + (this.viewBox.width / 2 - this.size.size * midX) + " " + (this.size.size * midY) + ")";
    if (delta === 4) return "translate(" + (this.viewBox.width - this.size.size * wingX) + " " + (this.size.size * wingY) + ")";
    if (delta === 5) return "translate(" + (this.viewBox.width - this.size.size * wingX) + " " + (this.viewBox.height - this.size.size * wingY) + ")";
    throw "bad delta";
  }
  getTitleTextAnchor(delta: number): "start" | "end" {
    return delta < 3 ? "start" : "end";
  }
  getTitle(team: Team, fromIndex: number): ITitle {
    const index = this.getTitleIndex(team);
    const delta = (index - fromIndex + 6) % 6;
    return {
      team: team,
      transform: this.getTitleTransform(delta),
      textAnchor: this.getTitleTextAnchor(delta)
    };
  }
  getTitles(): ITitle[] {
    const ourIndex = this.getTitleIndex(this.perspectiveTeam);
    return this.game.teams.map(team => this.getTitle(team, ourIndex));
  }
  territoryMouseenter(territory: Territory, md: MouseEvent) {
    this.territoryOver.next({ territory: territory, element: <SVGElement>md.target });
  }
  territoryMouseleave() {
    this.territoryOver.next(undefined);
  }
  territoryMouseup(territory: Territory) {
    this.territoryUp.next(territory);
  }
  territoryMousedown(fromTerritory: Territory) {
    if (this.game.over || !fromTerritory.piece || !fromTerritory.piece.isUs() || !fromTerritory.piece.team.myTurn)
      return;
    const target = <SVGElement>fromTerritory.piece.elementRef!.nativeElement;
    if (!target)
      return;
    this.game.beginningMove();
    this.game.save();
    this.boardService.moveToTopOfStack(target);
    const startRect = new Rectangle2D(target.getBoundingClientRect());
    const start = startRect.center();
    //const start = new Point2D(md.clientX, md.clientY);
    const startTrans = this.boardService.getTranslation(target);
    this.mousemove
      .pipe(map((mm) => {
        mm.preventDefault();
        return (new Point2D(mm.clientX, mm.clientY)).subtract(start);
      }))
      .pipe(takeUntil(race(this.mouseup, this.territoryUp)
        .pipe(map(toTerritory => {
          (toTerritory ? fromTerritory.piece!.attemptMove(toTerritory) : Promise.resolve(false)).then(suceeded => {
            if (suceeded)
              this.game.incrementTurn();
            else {
              this.game.restore();
              this.boardService.setTranslation(target, startTrans);
            }
          });
        }))
      ))
      .pipe(switchMap(pos => {
        const over = this.territoryOver.value;
        let r;
        if (over && fromTerritory.piece!.canMoveTo(over.territory))
          r = new Rectangle2D(over.element.getBoundingClientRect()).size(startRect.size(), true);
        else
          r = this.boardArea.nativeElement.getBoundingClientRect();
        return this.boardService.moveToRect(target, startRect.clone().translate(pos).constrainTo(r), 0);
      })).subscribe(() => {
        ;
      });
  }
  boardTransform() {
    let transform = "";
    const angle = this.game.board.rotation;
    transform += " translate(" + (-this.viewBox.x) + " " + (-this.viewBox.y) + ")";
    if (angle)
      transform += " rotate(" + angle + " " + (this.viewBox.width / 2) + " " + (this.viewBox.height / 2) + ")";
    return transform;
  }
  territoryTransform(territory: Territory, unrotate?: boolean): string {
    const offset = HexHelper.getHexOffset(this.size, territory.position);
    let transform = "";
    transform += " translate(" + offset.x + " " + offset.y + ")";
    const angle = territory.board.rotation;
    if (unrotate && angle)
      transform += " rotate(-" + angle + ")";
    return transform;
  };
  classes(territory: Territory) {
    return {
      'movable': territory.piece && territory.piece.canMove(),
      'open': territory.homeId === undefined,
      'red': territory.homeId === TeamId.Red,
      'yellow': territory.homeId === TeamId.Yellow,
      'green': territory.homeId === TeamId.Green,
      'cyan': territory.homeId === TeamId.Cyan,
      'blue': territory.homeId === TeamId.Blue,
      'magenta': territory.homeId === TeamId.Magenta
    };
  }
  moveIsMultiJump(move:Move){
    return isIMove(move) && move.to.length>1;
  }
}
interface ITitle {
  team: Team;
  transform: string;
  textAnchor: "start" | "end";
}
interface IOverTerritory {
  territory: Territory;
  element: SVGElement;
}
