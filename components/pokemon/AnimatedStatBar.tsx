import { Colors } from "@/constants/Colors";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export function AnimatedStatBar({ value, colorType }: { value: number; colorType: string }) {
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming((value / 250) * 100, { duration: 800 });
  }, [value]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
    height: 4,
    backgroundColor: colorType,
  }));

  return (
    <Animated.View style={[styles.statBar, { overflow: "hidden" }]}>
      <Animated.View style={[styles.statBarFill, animatedStyle]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  statBar: {
    position: "relative",
    flex: 1,
    height: 4,
    borderRadius: 4,
    backgroundColor: Colors.light.grayLight,
  },
  statBarFill: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 4,
    zIndex: 10,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
});
