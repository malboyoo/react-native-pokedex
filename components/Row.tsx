import { View, ViewProps, ViewStyle } from "react-native";

type Props = ViewProps & {
  gap?: number;
};

export function Row({ gap = 0, style, ...props }: Props) {
  return <View style={[rowStyle, style, { gap }]} {...props} />;
}

const rowStyle: ViewStyle = {
  flex: 0,
  flexDirection: "row",
  alignItems: "center",
};
