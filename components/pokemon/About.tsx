import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { PokemonI } from "@/interface/pokemon";
import { Image, StyleSheet, View } from "react-native";

export function About({ pokemon, colorType }: { pokemon: PokemonI; colorType: string }) {
  return (
    <View>
      {/* About */}
      <View style={styles.aboutTitle}>
        <ThemedText variant="subtitle1" style={{ color: colorType }}>
          About
        </ThemedText>
      </View>
      <Row style={styles.aboutContainer}>
        {/* Infos */}
        <Row style={styles.infosContainer}>
          <View style={styles.infoItem}>
            <Row gap={8} style={styles.infoItemRow}>
              <Image source={require("@/assets/images/weight.png")} width={16} height={16} />
              <ThemedText variant="body3" color="grayDark">
                {pokemon?.weight ? (pokemon.weight / 10).toFixed(1).replace(".", ",") : "0,0"} kg
              </ThemedText>
            </Row>
            <ThemedText variant="caption" color="grayMedium">
              Weight
            </ThemedText>
          </View>

          <View style={styles.infoItem}>
            <Row gap={8} style={styles.infoItemRow}>
              <Image source={require("@/assets/images/straighten.png")} width={16} height={16} />
              <ThemedText variant="body3" color="grayDark">
                {pokemon?.height ? (pokemon.height / 10).toFixed(1).replace(".", ",") : "0,0"} m
              </ThemedText>
            </Row>
            <ThemedText variant="caption" color="grayMedium">
              Height
            </ThemedText>
          </View>

          <View style={[styles.infoItem, { borderRightWidth: 0, height: 48 }]}>
            {pokemon?.moves.slice(0, 2).map((move) => (
              <ThemedText key={move.move.name} variant="body3" color="grayDark" style={{ lineHeight: 13 }} capitalize>
                {move.move.name}
              </ThemedText>
            ))}
            <ThemedText variant="caption" color="grayMedium">
              Moves
            </ThemedText>
          </View>
        </Row>
      </Row>
    </View>
  );
}

const styles = StyleSheet.create({
  aboutContainer: {
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  infosContainer: {
    justifyContent: "center",
    height: 48,
    maxHeight: 48,
    flex: 1,
  },
  infoItem: {
    height: "100%",
    flex: 1,
    gap: 4,
    justifyContent: "space-between",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: Colors.light.grayLight,
  },
  infoItemRow: {
    height: 32,
  },
  aboutTitle: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 16,
  },
});
