type ToneOscillator = {
  frequency: { value: number };
  connect(destination: unknown): unknown;
  start(): void;
  stop(when?: number): void;
};

export type GameAudioContext = {
  destination: unknown;
  resume?: () => void | Promise<void>;
  createOscillator: () => ToneOscillator;
  currentTime?: number;
};

export type GameAudioContextConstructor = new () => GameAudioContext;

let context: GameAudioContext | null = null;
let enabled = false;

function browserAudioConstructor(): GameAudioContextConstructor | null {
  if (typeof window === "undefined") return null;
  const audioWindow = window as unknown as {
    AudioContext?: GameAudioContextConstructor;
    webkitAudioContext?: GameAudioContextConstructor;
  };
  return audioWindow.AudioContext ?? audioWindow.webkitAudioContext ?? null;
}

/** Must be called from a direct user interaction, such as the visible Enable sound button. */
export function armGameSound(AudioContextConstructor = browserAudioConstructor()) {
  if (!AudioContextConstructor) return false;
  if (!context) context = new AudioContextConstructor();
  enabled = true;
  void context.resume?.();
  return true;
}

export function muteGameSound() {
  enabled = false;
}

export function isGameSoundEnabled() {
  return enabled;
}

/** Returns false until the player has explicitly enabled sound in this browser session. */
export function playGameFeedbackTone(correct: boolean) {
  if (!context || !enabled) return false;
  const oscillator = context.createOscillator();
  oscillator.frequency.value = correct ? 770 : 170;
  oscillator.connect(context.destination);
  oscillator.start();
  oscillator.stop((context.currentTime ?? 0) + 0.12);
  return true;
}

export function resetGameSoundForTest() {
  context = null;
  enabled = false;
}
