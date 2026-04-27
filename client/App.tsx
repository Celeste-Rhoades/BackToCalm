import "react-native-gesture-handler";
import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import * as SplashScreen from "expo-splash-screen";
import { initializeDisclaimerState } from "./src/store/authStore";
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
