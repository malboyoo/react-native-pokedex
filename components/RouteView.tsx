import { useThemeColors } from "@/hooks/useThemeColors";
import { useEffect } from "react";
import { StyleProp, ViewStyle } from "react-native";
import Animated, { Easing, interpolateColor, ReduceMotion, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  children?: React.ReactNode;
};

export function RootView({ style, backgroundColor, children, ...props }: Props) {
  const colors = useThemeColors();
  const progress = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(progress.value, [0, 1], [colors.tint, backgroundColor ?? colors.tint]),
    }),
    [backgroundColor]
  );

  useEffect(() => {
    if (backgroundColor) {
      progress.value = 0;
      progress.value = withTiming(1, { duration: 700, easing: Easing.out(Easing.quad), reduceMotion: ReduceMotion.System });
    }
  }, [backgroundColor]);

  if (!backgroundColor) {
    return <SafeAreaView style={[rootStyle, { backgroundColor: colors.tint }, style]}>{children}</SafeAreaView>;
  }
  return (
    <Animated.View style={[animatedStyle, { flex: 1 }, style]}>
      <SafeAreaView style={[rootStyle]} {...props}>
        {children}
      </SafeAreaView>
    </Animated.View>
  );
}

const rootStyle = {
  flex: 1,
  padding: 4,
};
