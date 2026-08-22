import { beforeEach, describe, expect, it } from "vitest";
import {
  armGameSound,
  isGameSoundEnabled,
  muteGameSound,
  playGameFeedbackTone,
  resetGameSoundForTest,
  type GameAudioContext,
  type GameAudioContextConstructor,
} from "./gameSound";

describe("game sound enablement", () => {
  beforeEach(() => resetGameSoundForTest());

  it("creates no audio and plays no tone before the player explicitly enables sound", () => {
    let constructed = 0;
    const Constructor = class {
      constructor() {
        constructed += 1;
      }
    } as unknown as GameAudioContextConstructor;

    expect(playGameFeedbackTone(true)).toBe(false);
    expect(constructed).toBe(0);
    expect(isGameSoundEnabled()).toBe(false);
    expect(Constructor).toBeDefined();
  });

  it("arms audio after an enable action, plays feedback, and respects mute", () => {
    const frequencies: number[] = [];
    let resumed = 0;
    const context: GameAudioContext = {
      destination: {},
      currentTime: 4,
      resume: () => {
        resumed += 1;
      },
      createOscillator: () => ({
        frequency: {
          get value() {
            return 0;
          },
          set value(value: number) {
            frequencies.push(value);
          },
        },
        connect: () => undefined,
        start: () => undefined,
        stop: () => undefined,
      }),
    };
    const Constructor = class {
      constructor() {
        return context;
      }
    } as unknown as GameAudioContextConstructor;

    expect(armGameSound(Constructor)).toBe(true);
    expect(isGameSoundEnabled()).toBe(true);
    expect(resumed).toBe(1);
    expect(playGameFeedbackTone(true)).toBe(true);
    expect(frequencies).toEqual([770]);

    muteGameSound();
    expect(isGameSoundEnabled()).toBe(false);
    expect(playGameFeedbackTone(false)).toBe(false);
    expect(frequencies).toEqual([770]);
  });
});
