import { Colors } from "@/constants/Colors";
import { PokemonI } from "@/interface/pokemon";
import { getStatShortname } from "@/utils/getStatShortname";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Row } from "../Row";
import { ThemedText } from "../ThemedText";
import { AnimatedStatBar } from "./AnimatedStatBar";

const baseStats = [
  { stat: { name: "hp" }, base_stat: 1 },
  { stat: { name: "attack" }, base_stat: 1 },
  { stat: { name: "defense" }, base_stat: 1 },
  { stat: { name: "special-attack" }, base_stat: 1 },
  { stat: { name: "special-defense" }, base_stat: 1 },
  { stat: { name: "speed" }, base_stat: 1 },
];

export function Stats({ pokemon, colorType }: { pokemon: PokemonI; colorType: string }) {
  const [stats, setStats] = useState<PokemonI["stats"]>(pokemon?.stats || baseStats);

  useEffect(() => {
    setStats(pokemon?.stats || baseStats);
  }, [pokemon?.stats]);

  return (
    <View style={styles.statsContainer}>
      <Row style={styles.statTitle}>
        <ThemedText variant="headline3" style={{ color: colorType }}>
          Base Stats
        </ThemedText>
      </Row>
      <Row>
        <View style={styles.statNameContainer}>
          {stats.map((stat) => (
            <View key={stat.stat.name} style={styles.statName}>
              <ThemedText key={stat.stat.name} variant="body3" style={{ color: colorType, fontWeight: "bold", textAlign: "right" }}>
                {getStatShortname(stat.stat.name)}
              </ThemedText>
            </View>
          ))}
        </View>
        <View style={styles.statValueContainer}>
          {stats.map((stat) => (
            <Row key={stat.stat.name}>
              <View style={styles.statValue}>
                <ThemedText key={stat.stat.name} variant="body3" color="grayDark">
                  {stat.base_stat.toString().padStart(3, "0")}
                </ThemedText>
              </View>

              <AnimatedStatBar key={stat.stat.name} value={stat.base_stat} colorType={colorType} />
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
});
