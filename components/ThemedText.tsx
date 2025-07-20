import { Colors } from "@/constants/Colors";
import { useThemeColors } from "@/hooks/useThemeColors";
import { StyleSheet, Text, TextProps } from "react-native";

const styles = StyleSheet.create({
  body3: {
    fontSize: 10,
    fontWeight: "400",
    lineHeight: 16,
  },
  body2: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  },
  body1: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
  headline: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 32,
  },
  caption: {
    fontSize: 8,
    fontWeight: "400",
    lineHeight: 12,
  },
  subtitle1: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 16,
  },
  subtitle2: {
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 16,
  },
  subtitle3: {
    fontSize: 10,
    fontWeight: "700",
    lineHeight: 16,
  },
});

type Props = TextProps & {
  variant?: keyof typeof styles;
  color?: keyof (typeof Colors)["light"];
  capitalize?: boolean;
};

export function ThemedText({ variant = "body3", color = "grayDark", style, capitalize, ...props }: Props) {
  const theme = useThemeColors();
  return <Text style={[styles[variant], { color: theme[color] }, capitalize && { textTransform: "capitalize" }, style]} {...props} />;
}
