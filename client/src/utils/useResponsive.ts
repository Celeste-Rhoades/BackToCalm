import { useState, useEffect } from "react";
import { Dimensions } from "react-native";

export const useResponsive = () => {
  // Track screen width
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );

  // Listen for screen size changes
  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreenWidth(window.width);
    });

    return () => subscription?.remove();
  }, []);

  // Calculate breakpoints
  const isMobile = screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1024;
  const isDesktop = screenWidth >= 1024;

  return { isMobile, isTablet, isDesktop, screenWidth };
};
