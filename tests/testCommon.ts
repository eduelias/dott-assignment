import { Bitmap } from "../src/models/bitmap";
import { Bit } from "../src/models/bit";

export class TestCommon {
  /**
   * Creates a dummy bitmap for testing purposes
   * @param size The size of the bitmap (it will have width = height)
   * @param whiteCondition A callback frunction that, when gives positions i and j, returns true if value is supposed to be one; otherwise zero
   */
  static createDummyBitmap(
    size: number,
    whiteCondition: (i: number, j: number) => boolean
  ): Bitmap {
    const b = new Bitmap(size, size);

    for (let i = 0; i < b.width; i++) {
      for (let j = 0; j < b.height; j++) {
        b.addBit(new Bit(j, i, whiteCondition(j, i) ? 1 : 0));
      }
    }

    return b;
  }

  static compareBitmaps(b1: Bitmap, b2: Bitmap): boolean {
    if (b1.width != b2.width) {
      return false;
    }

    if (b1.height != b2.height) {
      return false;
    }

    for (let x = 0; x < b1.width; x++) {
      for (let y = 0; y < b1.height; y++) {
        const bit1 = b1.getBitAt({ x, y });
        const bit2 = b2.getBitAt({ x, y });

        if (bit1.color != bit2.color) {
          return false;
        }
      }
    }

    return true;
  }
}
