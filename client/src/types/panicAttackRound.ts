export interface PanicAttackRound {
  roundNumber: number;
  selectedEmotion: string;
  initialRating: number;
  ownershipPhrases: string[];
  thoughtPatterns: string[];
  thoughtTexts: string[];
  selectedMantras: string[];
  replacementTexts: string[];
  finalRating: number;
  customOwnershipTexts: string[];
  timestamp: Date;
}
