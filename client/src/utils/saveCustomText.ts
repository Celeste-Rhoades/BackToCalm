import { Alert } from "react-native";

type SaveCustomTextProps = {
  typedText: string;
  savedText: string[];
  setSavedText: (list: string[]) => void;
  setTypedText: (text: string) => void;
  itemName: string;
};

export const saveCustomText = ({
  typedText,
  savedText,
  setSavedText,
  setTypedText,
  itemName,
}: SaveCustomTextProps) => {
  const trimmedText = typedText.trim();
  if (!trimmedText) {
    return;
  }

  if (savedText.includes(trimmedText)) {
    Alert.alert("Already Added", `You've already added this ${itemName}.`);
    return;
  }

  setSavedText([...savedText, trimmedText]);
  setTypedText("");
  Alert.alert("Saved", `Your ${itemName} has been added.`);
};
