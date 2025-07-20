import { useThemeColors } from "@/hooks/useThemeColors";
import { StyleSheet, View } from "react-native";

type Props = {
  checked: boolean;
};

export function Radio({ checked }: Props) {
  const colors = useThemeColors();
  return (
    <View style={[styles.radio, { borderColor: colors.tint }]}>{checked && <View style={[styles.radioInner, { backgroundColor: colors.tint }]}></View>}</View>
  );
}

const styles = StyleSheet.create({
  radio: {
    width: 16,
    height: 16,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
