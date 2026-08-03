import "react-native-gesture-handler";
import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import * as SplashScreen from "expo-splash-screen";
import {
  initializeDisclaimerState,
  initializeAuthListener,
} from "./src/store/authStore";
import { useFonts } from "expo-font";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    RalewayLight: require("./assets/fonts/Raleway-Light.ttf"),
    RalewayReg: require("./assets/fonts/Raleway-Regular.ttf"),
    PoiretOne: require("./assets/fonts/PoiretOne-Regular.ttf"),
    QuicksandLight: require("./assets/fonts/Quicksand-Light.ttf"),
    QuicksandReg: require("./assets/fonts/Quicksand-Regular.ttf"),
  });

  useEffect(() => {
    // Starts listening for Firebase Auth state as soon as the app boots,
    // so the store knows who's logged in before any screen renders
    initializeAuthListener();

    const initialize = async () => {
      await initializeDisclaimerState();

      if (fontsLoaded) {
        SplashScreen.hideAsync();
      }
    };

    initialize();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <AppNavigator />;
}
