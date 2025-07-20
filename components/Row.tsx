import { View, ViewProps, ViewStyle } from "react-native";

type Props = ViewProps & {
  gap?: number;
};

export function Row({ gap = 8, style, ...props }: Props) {
  return <View style={[rowStyle, style, { gap }]} {...props} />;
}

const rowStyle: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  flex: 0,
  alignItems: "center",
};
