import { describe, expect, it } from "vitest";
import { QUESTION_BANK_VERSION } from "@shared/gameData";
import { shouldResetForQuestionBank } from "./service";

describe("question-bank session compatibility", () => {
  it("resets snapshots with no version or an older question-bank version", () => {
    expect(shouldResetForQuestionBank({})).toBe(true);
    expect(shouldResetForQuestionBank({ questionBankVersion: "v1" })).toBe(true);
  });

  it("keeps snapshots created with the active question-bank version", () => {
    expect(shouldResetForQuestionBank({ questionBankVersion: QUESTION_BANK_VERSION })).toBe(false);
  });
});
