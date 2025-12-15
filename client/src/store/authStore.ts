import { create } from "zustand";

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

  // Actions
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  // Initial state
  user: null,
  token: null,
  isAuthenticated: false,

  // Actions
  setAuth: (user, token) => {
    set({
      user: user,
      token: token,
      isAuthenticated: true,
    });
  },

  logout: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));
