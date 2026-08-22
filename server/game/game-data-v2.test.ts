import { describe, expect, it } from "vitest";
import {
  DEMO_QUESTIONS,
  PLAYERS,
  PRIMARY_QUESTIONS,
  QUESTION_BANK_COUNTS,
  QUESTION_BANK_VERSION,
  RESERVE_QUESTIONS,
  TIEBREAKER_QUESTIONS,
  type GameQuestion,
} from "@shared/gameData";

function expectQuestionShape(question: GameQuestion) {
  expect(question.prompt.trim().length).toBeGreaterThan(0);
  expect(question.options).toHaveLength(4);
  expect(new Set(question.options.map(option => option.color))).toEqual(new Set(["red", "blue", "green", "yellow"]));
  expect(new Set(question.options.map(option => option.label.trim().toLocaleLowerCase())).size).toBe(4);
  expect(question.options.find(option => option.color === question.correctColor)?.label).toBe(question.correctLabel);
}

describe("Color Me Lucky v2 question bank", () => {
  it("contains the approved 103-question inventory and 30-reserve rotation", () => {
    expect(QUESTION_BANK_VERSION).toBe("v2");
    expect(QUESTION_BANK_COUNTS).toEqual({ demo: 3, primary: 65, reserve: 30, tiebreaker: 5, total: 103 });
    expect(DEMO_QUESTIONS).toHaveLength(3);
    expect(TIEBREAKER_QUESTIONS).toHaveLength(5);

    const primary = PLAYERS.flatMap(player => PRIMARY_QUESTIONS[player]);
    const reserves = PLAYERS.flatMap(player => RESERVE_QUESTIONS[player]);
    expect(primary).toHaveLength(65);
    expect(reserves).toHaveLength(30);
    expect(new Set([...DEMO_QUESTIONS, ...primary, ...reserves, ...TIEBREAKER_QUESTIONS].map(question => question.id)).size).toBe(103);
  });

  it("assigns 13 primary questions and six reserves, including one Color Trap Special, to each player", () => {
    for (const player of PLAYERS) {
      expect(PRIMARY_QUESTIONS[player]).toHaveLength(13);
      expect(RESERVE_QUESTIONS[player]).toHaveLength(6);
      expect(RESERVE_QUESTIONS[player].filter(question => Number(question.id.slice(1)) >= 91 && question.colorTrap)).toHaveLength(1);
    }
  });

  it("keeps every playable question four-colored with one declared correct answer", () => {
    const allQuestions = [
      ...DEMO_QUESTIONS,
      ...PLAYERS.flatMap(player => PRIMARY_QUESTIONS[player]),
      ...PLAYERS.flatMap(player => RESERVE_QUESTIONS[player]),
      ...TIEBREAKER_QUESTIONS,
    ];
    allQuestions.forEach(expectQuestionShape);
  });
});
