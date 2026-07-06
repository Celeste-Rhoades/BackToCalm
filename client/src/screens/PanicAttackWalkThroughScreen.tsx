import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  AppState,
  Alert,
  Platform,
} from "react-native";
import { colors, textStyles } from "../utils/theme";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../types/navigation";
import { useResponsive } from "../utils/useResponsive";
import { PanicAttackRound } from "../types/panicAttackRound";
import {
  retrieveSession,
  StoredSession,
  storeSession,
  deleteSession,
} from "../utils/sessionStorage";
import ResumeSessionModal from "../components/ResumeSessionModal";
import IdleWarningModal from "../components/IdleWarningModal";
import { useIdleDetection } from "../hooks/useIdleDetection";

import Step1Acknowledge from "../components/Step1Acknowledge";
import Step2Ownership from "../components/Step2Ownership";
import Step3Identify from "../components/Step3Identify";
import Step4Replace from "../components/Step4Replace";
import SessionSummary from "../components/SessionSummary";

type PanicAttackWalkthroughScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  "PanicAttackWalkthrough"
>;

type PanicAttackWalkthroughScreenProps = {
  navigation: PanicAttackWalkthroughScreenNavigationProp;
};

const PanicAttackWalkThroughScreen = ({
  navigation,
}: PanicAttackWalkthroughScreenProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [rounds, setRounds] = useState<PanicAttackRound[]>([]);
  const [currentRound, setCurrentRound] = useState<PanicAttackRound>({
    roundNumber: 1,
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
  });
  const [customOwnership, setCustomOwnership] = useState("");
  const [customThought, setCustomThought] = useState("");
  const [customReplacement, setCustomReplacement] = useState("");
  const [resumeSessionModal, setResumeSessionModal] = useState(false);
  const [idelWarningModal, setIdleWarningModal] = useState(false);
  const [storedSession, setStoredSession] = useState<StoredSession | null>(
    null,
  );

  const { isMobile, isTablet } = useResponsive();
  const { isIdle, setIsIdle, resetTimer } = useIdleDetection({
    enabled: !resumeSessionModal,
  });

  const handleStartOver = () => {
    setRounds([...rounds, currentRound]);
    setCurrentRound({
      roundNumber: rounds.length + 2,
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
    });
    setCustomOwnership("");
    setCustomThought("");
    setCustomReplacement("");
    setCurrentStep(1);
  };

  const handleComplete = () => {
    const allRounds = [...rounds, currentRound];
    console.log("Session complete! Rounds:", allRounds);
    setCustomOwnership("");
    setCustomThought("");
    setCustomReplacement("");
    navigation.goBack();
  };

  useEffect(() => {
    const checkForSession = async () => {
      const session = await retrieveSession();
      if (session) {
        setStoredSession(session);
        setResumeSessionModal(true);
      }
    };
    checkForSession();
  }, []);

  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      "change",
      nextAppState => {
        if (nextAppState === "background" || nextAppState === "inactive") {
          if (currentStep > 1 || currentRound.selectedEmotion !== "") {
            storeSession({
              currentStep: currentStep,
              currentRound: currentRound,
              rounds: rounds,
              customOwnership: customOwnership,
              customThought: customThought,
              customReplacement: customReplacement,
              status: "stillAnswering",
              savedAt: new Date(),
            });
          }
        }
      },
    );
    return () => {
      appStateListener.remove();
    };
  }, []);

  // Show idle warning when user has been inactive for 15 minutes
  useEffect(() => {
    if (isIdle) {
      setIdleWarningModal(true);
    }
  }, [isIdle]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      paddingTop: isMobile ? "3%" : isTablet ? "4%" : "5%",
      paddingHorizontal: isMobile ? "5%" : isTablet ? "4%" : "5%",
      paddingBottom: isMobile ? "2%" : "3%",
    },
    closeButton: {
      backgroundColor: colors.slateBlue,
      padding: isMobile ? 4 : isTablet ? 6 : 8,
      borderRadius: 8,
      boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
      elevation: 5,
      minWidth: isMobile ? 26 : 44,
      minHeight: isMobile ? 26 : 44,
      justifyContent: "center",
      alignItems: "center",
    },
    closeButtonText: {
      color: colors.white,
      fontSize: isMobile ? 18 : isTablet ? 20 : 16,
      fontWeight: "400",
    },
    contentContainer: {
      flex: 1,
    },
    footer: {
      paddingBottom: isMobile ? "7%" : isTablet ? "7%" : "5%",
      paddingHorizontal: isMobile ? "2%" : isTablet ? "1%" : "22%",
      paddingTop: isMobile ? ".5%" : isTablet ? "1%" : "1%",
    },
    stepIndicator: {
      fontSize: isMobile ? 12 : isTablet ? 14 : 22,
      fontWeight: "bold",
      color: colors.primary,
      textAlign: "center",
      marginBottom: isMobile ? "1%" : isTablet ? "1.5%" : "2%",
      ...textStyles.header,
    },
    buttonContainer: {
      flexDirection: "row",
      gap: isMobile ? 6 : isTablet ? 8 : 10,
      justifyContent: "center",
    },
    backButton: {
      backgroundColor: colors.deeperTeal,
      padding: isMobile ? 8 : isTablet ? 10 : 11,
      borderRadius: 8,
      minWidth: isMobile ? 60 : isTablet ? 70 : 80,
      alignItems: "center",
      boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
      elevation: 5,
    },
    nextButton: {
      backgroundColor: colors.slateBlue,
      padding: isMobile ? 8 : isTablet ? 10 : 11,
      borderRadius: 8,
      minWidth: isMobile ? 60 : isTablet ? 70 : 80,
      alignItems: "center",
      boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
      elevation: 5,
    },
    nextButtonText: {
      color: colors.white,
      fontSize: isMobile ? 12 : isTablet ? 14 : 16,
      fontWeight: "400",
      ...textStyles.header,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            if (Platform.OS === "web") {
              const confirmed = window.confirm(
                "Are you sure you want to close? Your progress will not be saved.",
              );
              if (confirmed) {
                deleteSession();
                navigation.goBack();
              }
            } else {
              Alert.alert(
                "Are you sure you want to close out this session?",
                "Your progress will not be saved.",
                [
                  { text: "Cancel", onPress: () => {} },
                  {
                    text: "Leave",
                    onPress: () => {
                      deleteSession();
                      navigation.goBack();
                    },
                  },
                ],
              );
            }
          }}
        >
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {currentStep === 1 && (
          <Step1Acknowledge
            selectedEmotion={currentRound.selectedEmotion}
            setSelectedEmotion={emotion =>
              setCurrentRound({ ...currentRound, selectedEmotion: emotion })
            }
            initialRating={currentRound.initialRating}
            setInitialRating={rating =>
              setCurrentRound({ ...currentRound, initialRating: rating })
            }
          />
        )}

        {currentStep === 2 && (
          <Step2Ownership
            ownershipPhrases={currentRound.ownershipPhrases}
            setOwnershipPhrases={phrases =>
              setCurrentRound({ ...currentRound, ownershipPhrases: phrases })
            }
            customOwnershipTexts={currentRound.customOwnershipTexts}
            setCustomOwnershipTexts={texts =>
              setCurrentRound({ ...currentRound, customOwnershipTexts: texts })
            }
            customOwnership={customOwnership}
            setCustomOwnership={setCustomOwnership}
          />
        )}

        {currentStep === 3 && (
          <Step3Identify
            thoughtPatterns={currentRound.thoughtPatterns}
            setThoughtPatterns={patterns =>
              setCurrentRound({ ...currentRound, thoughtPatterns: patterns })
            }
            thoughtTexts={currentRound.thoughtTexts}
            setThoughtTexts={texts =>
              setCurrentRound({ ...currentRound, thoughtTexts: texts })
            }
            customThought={customThought}
            setCustomThought={setCustomThought}
          />
        )}

        {currentStep === 4 && (
          <Step4Replace
            selectedMantras={currentRound.selectedMantras}
            setSelectedMantras={mantras =>
              setCurrentRound({ ...currentRound, selectedMantras: mantras })
            }
            customReplacement={customReplacement}
            setCustomReplacement={setCustomReplacement}
            replacementTexts={currentRound.replacementTexts}
            setReplacementTexts={texts =>
              setCurrentRound({ ...currentRound, replacementTexts: texts })
            }
          />
        )}

        {currentStep === 5 && (
          <SessionSummary
            rounds={rounds}
            currentRound={currentRound}
            setCurrentRound={setCurrentRound}
            onStartOver={handleStartOver}
            onComplete={handleComplete}
          />
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.stepIndicator}>
          {currentStep === 5 ? "Session Summary" : `Step ${currentStep} of 4`}
        </Text>
        <View style={styles.buttonContainer}>
          {currentStep > 1 && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setCurrentStep(currentStep - 1)}
            >
              <Text style={styles.nextButtonText}>Back</Text>
            </TouchableOpacity>
          )}
          {currentStep < 5 && (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => setCurrentStep(currentStep + 1)}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <ResumeSessionModal
        visible={resumeSessionModal}
        savedAt={storedSession?.savedAt ?? new Date()}
        onResume={() => {
          if (storedSession) {
            setCurrentStep(storedSession.currentStep);
            setCurrentRound(storedSession.currentRound);
            setRounds(storedSession.rounds);
            setCustomOwnership(storedSession.customOwnership);
            setCustomThought(storedSession.customThought);
            setCustomReplacement(storedSession.customReplacement);
          }
          setResumeSessionModal(false);
        }}
        onStartFresh={() => {
          deleteSession();
          setCurrentStep(1);
          setRounds([]);
          setCurrentRound({
            roundNumber: 1,
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
          });
          setCustomOwnership("");
          setCustomThought("");
          setCustomReplacement("");
          setResumeSessionModal(false);
        }}
      />
      <IdleWarningModal
        visible={idelWarningModal}
        onContinue={() => {
          setIsIdle(false);
          resetTimer();
          setIdleWarningModal(false);
        }}
        onStartOver={() => {
          setIsIdle(false);
          resetTimer();
          handleStartOver();
          setIdleWarningModal(false);
        }}
      />
    </View>
  );
};

export default PanicAttackWalkThroughScreen;
