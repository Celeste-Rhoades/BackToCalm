import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  onAuthStateChanged,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "../config/firebase";

// User shape derived from Firebase Auth, not our own backend
interface User {
  uid: string;
  email: string | null;
  username: string | null;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  disclaimerAccepted: boolean;
  authInitialized: boolean;

  setUser: (user: User | null) => void;
  setDisclaimerAccepted: (accepted: boolean) => void;
  logout: () => Promise<void>;
}

// Maps Firebase's user object to our leaner User type
const mapFirebaseUser = (firebaseUser: FirebaseUser): User => ({
  uid: firebaseUser.uid,
  email: firebaseUser.email,
  username: firebaseUser.displayName,
});

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  isAuthenticated: false,
  disclaimerAccepted: false,
  authInitialized: false,

  setUser: user => {
    set({
      user,
      isAuthenticated: user !== null,
    });
  },

  setDisclaimerAccepted: async accepted => {
    set({ disclaimerAccepted: accepted });
    if (accepted) {
      await AsyncStorage.setItem("disclaimerAccepted", "true");
    }
  },

  logout: async () => {
    await signOut(auth);
    set({
      user: null,
      isAuthenticated: false,
      disclaimerAccepted: false,
    });
    await AsyncStorage.removeItem("disclaimerAccepted");
  },
}));

// Call once at app startup (App.tsx). Firebase persists sessions across
// app restarts, so this restores the logged-in user automatically.
export const initializeAuthListener = () => {
  onAuthStateChanged(auth, firebaseUser => {
    if (firebaseUser) {
      useAuthStore.getState().setUser(mapFirebaseUser(firebaseUser));
    } else {
      useAuthStore.getState().setUser(null);
    }
    useAuthStore.setState({ authInitialized: true });
  });
};

export const initializeDisclaimerState = async () => {
  const stored = await AsyncStorage.getItem("disclaimerAccepted");
  if (stored === "true") {
    useAuthStore.getState().setDisclaimerAccepted(true);
  }
};
