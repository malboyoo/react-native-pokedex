import { Colors } from "@/constants/Colors";
import { PokemonI } from "@/interface/pokemon";
import { getStatShortname } from "@/utils/getStatShortname";
import { StyleSheet, View } from "react-native";
import { Row } from "../Row";
import { ThemedText } from "../ThemedText";

export function Stats({ pokemon, colorType }: { pokemon: PokemonI; colorType: string }) {
  return (
    <View style={styles.statsContainer}>
      <Row style={styles.statTitle}>
        <ThemedText variant="subtitle1" style={{ color: colorType }}>
          Base Stats
        </ThemedText>
      </Row>
      <Row>
        <View style={styles.statNameContainer}>
          {pokemon?.stats.map((stat) => (
            <View key={stat.stat.name} style={styles.statName}>
              <ThemedText key={stat.stat.name} variant="body3" style={{ color: colorType, fontWeight: "bold", textAlign: "right" }}>
                {getStatShortname(stat.stat.name)}
              </ThemedText>
            </View>
          ))}
        </View>
        <View style={styles.statValueContainer}>
          {pokemon?.stats.map((stat) => (
            <Row key={stat.stat.name}>
              <View style={styles.statValue}>
                <ThemedText key={stat.stat.name} variant="body3" color="grayDark">
                  {stat.base_stat.toString().padStart(3, "0")}
                </ThemedText>
              </View>

              <View style={styles.statBar}>
                <View style={[styles.statBarFill, { width: `${(stat.base_stat / 250) * 100}%`, backgroundColor: colorType }]}></View>
              </View>
            </Row>
          ))}
        </View>
      </Row>
    </View>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  statTitle: {
    justifyContent: "center",
    paddingVertical: 16,
  },
  statNameContainer: {
    width: 44,
    paddingRight: 12,
    borderRightWidth: 1,
    borderRightColor: Colors.light.grayLight,
  },
  statValueContainer: {
    flex: 1,
  },
  statName: {
    height: 16,
    justifyContent: "flex-end",
    textAlign: "right",
  },
  statValue: {
    height: 16,
    paddingHorizontal: 12,
  },
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
