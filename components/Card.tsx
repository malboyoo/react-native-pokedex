import { Shadows } from "@/constants/Shadows";
import { useThemeColors } from "@/hooks/useThemeColors";
import { View, ViewProps } from "react-native";

type Props = ViewProps & {
  children: React.ReactNode;
};

export function Card({ style, children, ...props }: Props) {
  const colors = useThemeColors();
  return (
    <View style={[style, styles, { backgroundColor: colors.grayWhite }]} {...props}>
      {children}
    </View>
  );
}

const styles = {
  borderRadius: 8,
  ...Shadows.dp2,
};
