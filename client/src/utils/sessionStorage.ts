import AsyncStorage from "@react-native-async-storage/async-storage";
import { PanicAttackRound } from "../types/panicAttackRound";

type SessionStatus = "stillAnswering" | "finishedNotSaved";

interface StoredSession {
  currentStep: number;
  currentRound: PanicAttackRound;
  rounds: PanicAttackRound[];
  customOwnership: string;
  customThought: string;
  customReplacement: string;
  status: SessionStatus;
  savedAt: Date;
}

const storeSession = async (session: StoredSession): Promise<void> => {
  try {
    const sessionData = JSON.stringify(session);
    await AsyncStorage.setItem("currentSession", sessionData);
  } catch (error) {
    console.error(error);
  }
};
const retrieveSession = async (): Promise<StoredSession | null> => {
  try {
    const sessionData = await AsyncStorage.getItem("currentSession");

    // If nothing is stored, return null
    if (sessionData === null) return null;

    // Convert string back to object and return it
    return JSON.parse(sessionData) as StoredSession;
  } catch (error) {
    console.error(error);
    return null;
  }
};
