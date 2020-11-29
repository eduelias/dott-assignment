import { IBitMap } from "./interfaces/ibitmap";
import { IBit } from "./interfaces/ibit";
import { Bit } from "./bit";

export class Bitmap {
  public map: IBitMap;
  private whiteBits: Array<IBit> = [];

  constructor(private width: number, private height: number) {
    this.map = {};
  }

  /**
   * Add a whole line to the Bitmap
   *
   * @param y Y of the line being inserted
   * @param line Arrat<IBit> Bits of the line being inserted
   */
  public addLine({ y, line }: { y: number; line: Array<number> }): void {
    let currentColumn = 0;
    for (let color of line) {
      const bit = new Bit(currentColumn, y, color);
      if (bit.color === 1) {
        this.whiteBits.push(bit);
      }
      this.map[y] = this.map[y] || {};
      this.map[y][bit.x] = bit;
      currentColumn++;
    }
  }

  /**
   *
   * Returns the pit at {x,y} position.
   * Used on the main, to calculate distances
   *
   * @param x Bit X position
   * @param y Bit Y position
   */
  public getBitAt({ x, y }: { x: number; y: number }): IBit {
    return this.map[y][x];
  }

  /**
   * Returns all the white bites of this bitmap.
   * Used on the distance helper
   */
  public getWhiteBitList(): Array<IBit> {
    return this.whiteBits;
  }
}
