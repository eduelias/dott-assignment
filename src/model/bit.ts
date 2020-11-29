import { IBit } from "./interfaces/ibit";

export class Bit implements IBit {
  constructor(public x: number, public y: number, public color: number) {}

  /**
   * Calculates the distance between two bits
   *
   * @param {IBit} bit
   * @returns {number} distance
   * @memberof IBit
   */
  public distanceOf(bit: IBit): number {
    return Math.abs(this.x - bit.x) + Math.abs(this.y - bit.y);
  }
}
