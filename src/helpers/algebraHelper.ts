import { IBit } from "../models/interfaces/ibit";

export class AlgebraHelper {
  /**
   * Find the distance from a given bit to the nearest white pixel in the list.
   * Used on the main, to calculate distances
   *
   * @param whiteBitList The list of white bits
   * @param bit The bit
   * @returns A number of the distance in between the bit and the nearest white pixel
   */
  static findDistanceToNearestWhiteBit(
    whiteBitList: Array<IBit>,
    bit: IBit
  ): number {
    // if bit is white, it is our guy
    if (bit.color == 1) {
      return 0;
    }

    let min: number = Number.MAX_SAFE_INTEGER;
    for (const whitePixel of whiteBitList) {
      min = Math.min(min, AlgebraHelper.calculateDistance(bit, whitePixel));
    }

    return min;
  }

  /**
   * Calculates the distance in between two Bits.
   * @param bit1 Bit 1
   * @param bit2 Bit 2
   * @returns Returns the distance in between p1 and p2 according to the formula d = |bit1.x - bit2.x| + |bit1.y - bit2.y|
   */
  static calculateDistance(bit1: IBit, bit2: IBit): number {
    return Math.abs(bit1.x - bit2.x) + Math.abs(bit1.y - bit2.y);
  }
}
