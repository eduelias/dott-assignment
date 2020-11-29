import * as readline from "readline";
import { Case } from "./case";

const rlInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const runs: Array<Case> = [];

/**
 * Actual runner, shifts, run, theres a next? run again.
 */
function runNext(): void {
  rlInterface.removeAllListeners();
  const next = runs.shift();
  if (next) {
    return next.run();
  }
  rlInterface.close();
}

/**
 * Error handler, closes the interface and exits the app
 * @param message
 */
function terminateBadly(message?: string): void {
  if (message) process.stdout.write(message);
  rlInterface.close();
  process.exit(1);
}

/**
 * Asks the user for the number of test cases to run
 */
rlInterface.question(
  "Please, enter the number of runs (1 <= t <= 1000):",
  (stringNumberOfRuns) => {
    const numberOfRuns = parseInt(stringNumberOfRuns);
    if (!numberOfRuns || numberOfRuns < 1 || numberOfRuns > 1000) {
      terminateBadly("Number of runs must be between 1 and 1000");
    }

    for (let currentRun = 0; currentRun < numberOfRuns; currentRun++) {
      const testCase = new Case(currentRun, rlInterface);
      testCase.on("end", runNext);
      testCase.on("write", (message) => process.stdout.write(`${message}`));
      testCase.on("error", terminateBadly);
      runs.push(testCase);
    }

    runNext();
  }
);
