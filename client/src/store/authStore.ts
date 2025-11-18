import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

// User type - matches what backend returns
interface User {
  id: string;
  username: string;
  email: string;
}

// Auth state shape
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  disclaimerAccepted: boolean;

  // Actions
  setAuth: (user: User, token: string) => void;
  setDisclaimerAccepted: (accepted: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  // Initial state
  user: null,
  token: null,
  isAuthenticated: false,
  disclaimerAccepted: false,

  // Actions
  setAuth: (user, token) => {
    set({
      user: user,
      token: token,
      isAuthenticated: true,
    });
  },

  setDisclaimerAccepted: async accepted => {
    set({ disclaimerAccepted: accepted });
    // Persist to AsyncStorage
    if (accepted) {
      await AsyncStorage.setItem("disclaimerAccepted", "true");
    }
  },
  logout: async () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      disclaimerAccepted: false,
    });
    // Clear from AsyncStorage
    await AsyncStorage.removeItem("disclaimerAccepted");
  },
}));
// Load disclaimer state from AsyncStorage on app start
export const initializeDisclaimerState = async () => {
  const stored = await AsyncStorage.getItem("disclaimerAccepted");
  if (stored === "true") {
    useAuthStore.getState().setDisclaimerAccepted(true);
  }
};
