import { EventEmitter } from "events";
import * as readline from "readline";
import { AlgebraHelper } from "./helpers/algebra";
import { Bitmap } from "./model/bitmap";

/**
 * Class that carries the logit for each test case
 */
export class Case extends EventEmitter {
  constructor(public number: number, private rlInterface: readline.Interface) {
    super();
  }

  /**
   * Runs the test case
   */
  public run() {
    this.rlInterface.question(
      `[Run #${
        this.number + 1
      }] Please, enter height and width of the image (1 <= N <= 182) `,
      (answer) => this.onRun(answer)
    );
  }

  /**
   * Calculates distances between white and black bits
   *
   * @param bitmap bitmap to calculate distances
   */
  private calculateDistances(bitmap): void {
    for (let y = 0; y < bitmap.height; y++) {
      for (let x = 0; x < bitmap.width; x++) {
        const bit = bitmap.getBitAt({ x, y });
        const distance = AlgebraHelper.findDistanceToNearestWhiteBit(
          bitmap.getWhiteBitList(),
          bit
        );
        this.emit("write", `${distance} `);
      }
      this.emit("write", `\n`);
    }
    this.emit("write", `\n`);
  }

  /**
   *
   * @param mapSizes
   */
  private onRun(mapSizes): void {
    const sizesArray = mapSizes
      .trim()
      .split(" ")
      .map((sizesString) => parseInt(sizesString));

    if (
      sizesArray.length < 2 ||
      sizesArray.find((number) => !number || number < 1 || number > 182)
    ) {
      this.emit(
        "error",
        "Height and Width must be two numbers between 1 and 182"
      );
    }

    this.processLines(sizesArray);
  }

  private onLine({ currentLine, line, height, width, bitmap }): any {
    const lineSplit = line
      .trim()
      .split(" ")
      .map((char) => parseInt(char));

    if (lineSplit.length != width) {
      this.emit("write", `The line width must be ${width}!`);
      this.emit("end");
    }

    bitmap.addLine({ y: currentLine, line: lineSplit });

    currentLine++;
    if (currentLine === height) {
      this.emit("write", `--- Output for case #${this.number + 1} --- \n`);
      this.calculateDistances(bitmap);
      return this.emit("end");
    }
    this.emit("write", `[Row ${currentLine + 1} of ${height}]:`);
  }

  private processLines(sizesArray: any) {
    const height = sizesArray[0];
    const width = sizesArray[1];
    const bitmap = new Bitmap(width, height);
    let currentLine = 0;

    this.emit("write", `Please, add bitmap lines (max ${width} columns):\n`);
    this.emit("write", `[Row ${currentLine + 1} of ${height}]:`);

    this.rlInterface.on("line", (line) =>
      this.onLine({ currentLine, line, height, width, bitmap })
    );
  }
}
