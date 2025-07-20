import { useThemeColors } from "@/hooks/useThemeColors";
import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { Card } from "../Card";
import { ThemedText } from "../ThemedText";

type Props = {
  style?: ViewStyle;
  id: number;
  name: string;
};

export function PokemonCard({ style, id, name }: Props) {
  const colors = useThemeColors();
  return (
    <Link href={{ pathname: `/pokemon/[id]`, params: { id: id.toString() } }} asChild>
      <Pressable android_ripple={{ color: colors.grayBackground, foreground: true }} style={style}>
        <Card style={[styles.card]} id={id.toString()}>
          <ThemedText style={styles.id} variant="caption" color="grayMedium">
            #{id.toString().padStart(3, "0")}
          </ThemedText>
          <Image
            source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png` }}
            width={72}
            height={72}
          />
          <ThemedText variant="body3" color="grayDark">
            {name}
          </ThemedText>
          <View style={[styles.backgroundEffect, { backgroundColor: colors.grayBackground }]}></View>
        </Card>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    padding: 4,
    position: "relative",
    overflow: "hidden",
  },
  id: {
    alignSelf: "flex-end",
  },
  backgroundEffect: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    height: 44,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
});
