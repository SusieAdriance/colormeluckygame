import fs from "node:fs";

const sourcePath = "/home/ubuntu/upload/Color_Me_Lucky_Question_Bank_v2.md";
const outputPath = "/home/ubuntu/color-me-lucky-spec/shared/gameData.ts";
const source = fs.readFileSync(sourcePath, "utf8");

const colorMap = { "🔴": "red", "🔵": "blue", "🟢": "green", "🟡": "yellow" };
const playerNames = ["Stephanny", "Giann", "Francisco", "Lyka", "Jenny"];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function nextNonEmpty(lines, start) {
  for (let index = start; index < lines.length; index += 1) {
    if (lines[index].trim()) return { value: lines[index].trim(), index };
  }
  throw new Error("Unexpected end of the v2 question bank");
}

function parseOptions(line, id) {
  const options = line.split("|").map((part) => {
    const cleaned = part.trim();
    const emoji = Object.keys(colorMap).find((key) => cleaned.startsWith(key));
    assert(emoji, `Invalid answer option for ${id}: ${cleaned}`);
    return { color: colorMap[emoji], label: cleaned.slice(emoji.length).trim() };
  });
  assert(options.length === 4, `${id} must have exactly four answer options`);
  assert(new Set(options.map((option) => option.color)).size === 4, `${id} has a duplicate answer color`);
  assert(new Set(options.map((option) => option.label.trim().toLocaleLowerCase())).size === 4, `${id} has duplicate answer labels`);
  return options;
}

function parseAnswer(line, id) {
  const answer = line.trim().replace(/^\*?Answer:\s*/i, "").replace(/\*$/, "");
  const match = answer.match(/^(.*?)\s*\((Red|Blue|Green|Yellow)(?:\s+button)?[^)]*\)$/i);
  assert(match, `Could not parse answer for ${id}: ${line}`);
  return { correctLabel: match[1].trim(), correctColor: match[2].toLowerCase() };
}

function parseQuestion(line, id) {
  const match = line.match(/^\*\*(D?\d+)\.\*\*\s+(.*)$/);
  assert(match, `Could not parse question heading: ${line}`);
  let remainder = match[2].trim();
  const categoryMatch = remainder.match(/^(?:\*\*)?\[([^\]]+)\](?:\*\*)?\s+(.*)$/);
  const category = categoryMatch?.[1] ?? (id.startsWith("D") ? "Demo" : "Tiebreaker");
  if (categoryMatch) remainder = categoryMatch[2];
  return { category, prompt: remainder };
}

const lines = source.split(/\r?\n/);
const demo = [];
const primary = [];
const reserve = [];
const tiebreakers = [];
const answerMismatches = [];
let section = null;
let playerIndex = null;

for (let index = 0; index < lines.length; index += 1) {
  const line = lines[index].trim();
  if (line === "## Demo Round (3 Questions, Not Scored)") {
    section = "demo";
    playerIndex = null;
    continue;
  }
  const playerMatch = line.match(/^## PLAYER (\d+) POOL \(13 Questions\)$/);
  if (playerMatch) {
    section = "primary";
    playerIndex = Number(playerMatch[1]) - 1;
    continue;
  }
  if (line === "## RESERVE BANK (25 Questions — Auto-Loads When Primary Pool Runs Out)") {
    section = "reserve";
    playerIndex = null;
    continue;
  }
  if (line === "## TIEBREAKER QUESTIONS (5 Questions — Sudden Death, Used Only If Needed)") {
    section = "tiebreaker";
    playerIndex = null;
    continue;
  }

  const heading = line.match(/^\*\*(D?\d+)\.\*\*/);
  if (!heading || !section) continue;

  const sourceId = heading[1];
  const parsed = parseQuestion(line, sourceId);
  const optionsLine = nextNonEmpty(lines, index + 1);
  const answerLine = nextNonEmpty(lines, optionsLine.index + 1);
  const options = parseOptions(optionsLine.value, sourceId);
  const answer = parseAnswer(answerLine.value, sourceId);
  const correctOption = options.find((option) => option.color === answer.correctColor);
  assert(correctOption, `Correct color is missing from ${sourceId}`);
  if (correctOption.label.trim().toLocaleLowerCase() !== answer.correctLabel.trim().toLocaleLowerCase()) {
    const statedAnswerOption = options.find(
      (option) => option.label.trim().toLocaleLowerCase() === answer.correctLabel.trim().toLocaleLowerCase(),
    );
    assert(statedAnswerOption, `The stated answer label is absent from ${sourceId}: ${answer.correctLabel}`);
    answerMismatches.push({
      sourceId,
      statedAnswer: answer.correctLabel,
      statedButton: answer.correctColor,
      buttonLabel: correctOption.label,
    });
    const displacedLabel = correctOption.label;
    correctOption.label = statedAnswerOption.label;
    statedAnswerOption.label = displacedLabel;
  }

  const colorTrap = /COLOR TRAP/i.test(`${line} ${answerLine.value}`);
  const question = {
    id: section === "demo" ? sourceId : section === "primary" ? `Q${sourceId}` : section === "reserve" ? `R${sourceId}` : `TB${Number(sourceId) - 95}`,
    category: parsed.category,
    prompt: parsed.prompt,
    options,
    correctColor: answer.correctColor,
    correctLabel: correctOption.label,
    colorTrap,
    playerIndex,
    sourceNumber: Number(sourceId.replace("D", "")),
  };

  if (section === "demo") demo.push(question);
  if (section === "primary") primary.push(question);
  if (section === "reserve") reserve.push(question);
  if (section === "tiebreaker") tiebreakers.push(question);
  index = answerLine.index;
}

assert(demo.length === 3, `Expected 3 demo questions, received ${demo.length}`);
assert(primary.length === 65, `Expected 65 primary questions, received ${primary.length}`);
assert(reserve.length === 30, `Expected 30 approved reserve questions, received ${reserve.length}`);
assert(tiebreakers.length === 5, `Expected 5 tiebreakers, received ${tiebreakers.length}`);

const primaryByPlayer = Object.fromEntries(playerNames.map((name, index) => {
  const questions = primary.filter((question) => question.playerIndex === index);
  assert(questions.length === 13, `${name} needs 13 primary questions, received ${questions.length}`);
  return [name, questions];
}));

const standardReserves = reserve.filter((question) => question.sourceNumber < 91);
const colorTrapSpecials = reserve.filter((question) => question.sourceNumber >= 91);
assert(standardReserves.length === 25, `Expected 25 standard reserves, received ${standardReserves.length}`);
assert(colorTrapSpecials.length === 5, `Expected 5 Color Trap Specials, received ${colorTrapSpecials.length}`);

const reservesByPlayer = Object.fromEntries(playerNames.map((name, index) => {
  const questions = [
    ...standardReserves.slice(index * 5, index * 5 + 5),
    colorTrapSpecials[index],
  ];
  assert(questions.length === 6, `${name} needs 6 reserves, received ${questions.length}`);
  return [name, questions];
}));

const allQuestions = [demo, primary, reserve, tiebreakers].flat();
assert(new Set(allQuestions.map((question) => question.id)).size === 103, "Question IDs must be unique across the v2 bank");
assert(new Set(allQuestions.map((question) => question.prompt.trim().toLocaleLowerCase())).size === 103, "Question prompts must be unique across the v2 bank");

function toQuestion(question) {
  const { playerIndex: _playerIndex, sourceNumber: _sourceNumber, ...record } = question;
  return record;
}

const output = `/**
 * Generated from the approved Color Me Lucky Question Bank v2.
 * Inventory: 3 demo, 65 primary, 30 reserve (six per player), and 5 tiebreakers.
 * Do not edit by hand; run scripts/build-game-data.mjs after source-content changes.
 */

export const PLAYERS = ${JSON.stringify(playerNames, null, 2)} as const;
export type PlayerName = (typeof PLAYERS)[number];
export type AnswerColor = "red" | "blue" | "green" | "yellow";
export type GameQuestion = {
  id: string;
  category: string;
  prompt: string;
  options: Array<{ color: AnswerColor; label: string }>;
  correctColor: AnswerColor;
  correctLabel: string;
  colorTrap: boolean;
};

export const QUESTION_BANK_VERSION = "v2";
export const QUESTION_BANK_COUNTS = { demo: 3, primary: 65, reserve: 30, tiebreaker: 5, total: 103 } as const;

export const DEMO_QUESTIONS: GameQuestion[] = ${JSON.stringify(demo.map(toQuestion), null, 2)};

export const PRIMARY_QUESTIONS: Record<PlayerName, GameQuestion[]> = ${JSON.stringify(Object.fromEntries(Object.entries(primaryByPlayer).map(([name, questions]) => [name, questions.map(toQuestion)])), null, 2)};

export const RESERVE_QUESTIONS: Record<PlayerName, GameQuestion[]> = ${JSON.stringify(Object.fromEntries(Object.entries(reservesByPlayer).map(([name, questions]) => [name, questions.map(toQuestion)])), null, 2)};

export const TIEBREAKER_QUESTIONS: GameQuestion[] = ${JSON.stringify(tiebreakers.map(toQuestion), null, 2)};

export const PRIZES: Record<number, number> = { 1: 50, 2: 35, 3: 30, 4: 20, 5: 15 };
`;

fs.writeFileSync(outputPath, output);
const validationReport = `# Color Me Lucky — Question Bank v2 Validation\n\nThe approved v2 inventory contains **103 questions**: 3 demo questions, 65 primary questions, 30 reserves, and 5 tiebreakers. The 30 reserve questions are distributed as six per player: five standard reserve questions plus one Color Trap Special.\n\n## Answer-button normalization\n\nThe source document contains six Color Trap entries where the option row conflicts with the explicit \`Answer:\` line’s declared button color. The generator treats the explicit answer line as authoritative and swaps only the two affected option labels so the stated correct answer appears on the stated button. No prompt, answer label, or game rule was changed.\n\n| Question | Correct answer | Declared button | Source option on that button | Applied normalization |\n| --- | --- | --- | --- | --- |\n${answerMismatches.map((item) => `| ${item.sourceId} | ${item.statedAnswer} | ${item.statedButton} | ${item.buttonLabel} | Moved ${item.statedAnswer} to the ${item.statedButton} button |`).join("\n")}\n`;
fs.writeFileSync("/home/ubuntu/color-me-lucky-spec/question-bank-v2-validation.md", validationReport);
console.log(`Generated shared/gameData.ts with 103 approved v2 questions and normalized ${answerMismatches.length} declared Color Trap placements.`);
