import { expect } from "chai";
import { Bit } from "../src/models/bit";
import { AlgebraHelper } from "../src/helpers/algebraHelper";
import { TestCommon } from "./testCommon";

describe("Algebra helpers", () => {
  it("should properly calculate distance in between two bits", () => {
    const p1 = new Bit(10, 10, 0);
    const p2 = new Bit(10, 1, 0);

    const e = Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);

    expect(e).to.be.equal(AlgebraHelper.calculateDistance(p1, p2));
  });

  it("should properly find the closest white pixel from a single bitmap", () => {
    const bitMap = TestCommon.createDummyBitmap(3, (i, j) => {
      return i == 2 && j == 2;
    });
    // Create dummy bitmap
    const whiteBits = bitMap.getWhiteBitList();

    // Run tests from different positions in the dummy bitmap
    expect(
      AlgebraHelper.findDistanceToNearestWhiteBit(whiteBits, new Bit(0, 0, 0))
    ).to.be.equal(4);
    expect(
      AlgebraHelper.findDistanceToNearestWhiteBit(whiteBits, new Bit(1, 0, 0))
    ).to.be.equal(3);
    expect(
      AlgebraHelper.findDistanceToNearestWhiteBit(whiteBits, new Bit(2, 0, 0))
    ).to.be.equal(2);
    expect(
      AlgebraHelper.findDistanceToNearestWhiteBit(whiteBits, new Bit(0, 1, 0))
    ).to.be.equal(3);
    expect(
      AlgebraHelper.findDistanceToNearestWhiteBit(whiteBits, new Bit(0, 2, 0))
    ).to.be.equal(2);
    expect(
      AlgebraHelper.findDistanceToNearestWhiteBit(whiteBits, new Bit(1, 1, 0))
    ).to.be.equal(2);
    expect(
      AlgebraHelper.findDistanceToNearestWhiteBit(whiteBits, new Bit(1, 2, 0))
    ).to.be.equal(1);
    expect(
      AlgebraHelper.findDistanceToNearestWhiteBit(whiteBits, new Bit(2, 2, 0))
    ).to.be.equal(0);
  });
});
