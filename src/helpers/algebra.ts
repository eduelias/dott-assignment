import { IBit } from "../model/interfaces/ibit";

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
      min = Math.min(min, bit.distanceOf(whitePixel));
    }

    return min;
  }
}
