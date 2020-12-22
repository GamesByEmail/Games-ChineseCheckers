import { IBaseMove } from "@gamesbyemail/base";
import { PieceChar } from "./piece";
import { TeamId } from "./team-id";

export type Move = ((IMove & IModMove) | IResign | IAcceptDraw);

export interface IMove extends IBaseMove<TeamId> {
  piece:PieceChar;
  from:number;
  to:number[];
}
export interface IModMove {
  offerDraw?:true;
}
export function isIMove(move:Move): move is (IMove & IModMove) {
  const m=<any>move;
  return typeof(m.piece)==="string" && typeof(m.from)==="number";
}
export interface IResign extends IBaseMove<TeamId> {
  resign:true;
}
export function isIResign(move:Move): move is IResign {
  const m=<any>move;
  return m.resign;
}
export interface IAcceptDraw extends IBaseMove<TeamId> {
  acceptDraw:true;
}
export function isIAcceptDraw(move:Move): move is IAcceptDraw {
  const m=<any>move;
  return m.acceptDraw;
}
