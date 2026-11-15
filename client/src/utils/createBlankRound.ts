import { PanicAttackRound } from "../types/panicAttackRound";

export const createBlankRound = (roundNumber: number): PanicAttackRound => {
  return {
    roundNumber,
    selectedEmotion: "",
    initialRating: 5,
    ownershipPhrases: [],
    customOwnershipTexts: [],
    thoughtPatterns: [],
    thoughtTexts: [],
    selectedMantras: [],
    replacementTexts: [],
    finalRating: 5,
    timestamp: new Date(),
  };
};
