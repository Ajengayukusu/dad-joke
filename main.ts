// SPDX-License-Identifier: MIT
// One dad joke for make.fun's Dad Joke Showdown bounty: a pun, a groan, and a straight-faced delivery.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE = "I told my wife I'd make the bed today, so I framed it, hung it on the wall, and now it's art.";

const MAX_CHARS = 200;

function entryLine(): string {
  const line = LINE.trim();
  if (line.length === 0) {
    throw new Error("entry must not be empty");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(`entry line is ${line.length} characters, over the ${MAX_CHARS} limit`);
  }
  if (/\r|\n/.test(line)) {
    throw new Error("entry must be a single line");
  }
  // No control characters and no accidental double spaces: either would
  // break the one-line rendering the judge sees.
  if (/[\u0000-\u001F\u007F]/.test(line)) {
    throw new Error("entry must not contain control characters");
  }
  if (/  /.test(line)) {
    throw new Error("entry must not contain double spaces");
  }
  // "make.fun" carries a period of its own; ignore it when counting sentences.
  const endings = line.replace(/make\.fun/g, "makefun").match(/[.!?]/g) ?? [];
  if (endings.length !== 1 || !line.endsWith(".")) {
    throw new Error("entry must be a single sentence ending with a period");
  }
  return line;
}

function main(): void {
  const line = entryLine();
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line, "utf8");
  console.log(`wrote ${line.length} characters to /output/entry.txt`);
}

main();
