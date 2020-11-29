import { IBit } from "./interfaces/ibit";

export class Bit implements IBit {
  constructor(public x: number, public y: number, public color: number) {}
}
