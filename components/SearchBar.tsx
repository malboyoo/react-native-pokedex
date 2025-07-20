import { useThemeColors } from "@/hooks/useThemeColors";
import { Image, StyleSheet, TextInput } from "react-native";
import { Row } from "./Row";

type Props = {
  onChange: (text: string) => void;
  value: string;
};

export function SearchBar({ onChange, value }: Props) {
  const colors = useThemeColors();

  return (
    <Row style={[styles.wrapper, { backgroundColor: colors.grayWhite }]} gap={8}>
      <Image source={require("@/assets/images/search.png")} width={16} height={16} />
      <TextInput style={styles.input} onChangeText={onChange} value={value} />
    </Row>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderRadius: 16,
    height: 32,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    height: 32,
    fontSize: 10,
  },
});
