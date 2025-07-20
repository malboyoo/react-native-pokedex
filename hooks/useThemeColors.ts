import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

export const useThemeColors = () => {
  const colorScheme = useColorScheme() ?? "light";
  return Colors[colorScheme];
};
