import { Colors } from "@/constants/Colors";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { ThemedText } from "../ThemedText";

type TagProps = {
  children: React.ReactNode;
  type: keyof typeof Colors.type;
  style?: StyleProp<ViewStyle>;
};

export function Tag({ children, type, style, ...props }: TagProps) {
  return (
    <View style={[styles.tag, { backgroundColor: Colors.type[type] }, style]} {...props}>
      <ThemedText variant="subtitle2" color="grayWhite">
        {children}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
});
