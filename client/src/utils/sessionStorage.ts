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

export const storeSession = async (session: StoredSession): Promise<void> => {
  try {
    const sessionData = JSON.stringify(session);
    await AsyncStorage.setItem("currentSession", sessionData);
  } catch (error) {
    console.error(error);
  }
};
export const retrieveSession = async (): Promise<StoredSession | null> => {
  try {
    const sessionData = await AsyncStorage.getItem("currentSession");

    // If nothing is stored, return null
    if (sessionData === null) return null;

    const session = JSON.parse(sessionData) as StoredSession;
    // Convert savedAt back to a real Date object — JSON.parse returns it as a string
    session.savedAt = new Date(session.savedAt);
    return session;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const deleteSession = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem("currentSession");
  } catch (error) {
    console.error(error);
  }
};
