import { Card } from "@/components/Card";
import { About } from "@/components/pokemon/About";
import { Stats } from "@/components/pokemon/Stats";
import { Tag } from "@/components/pokemon/Tag";
import { RootView } from "@/components/RouteView";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { PokemonI } from "@/interface/pokemon";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";

export default function Pokemon() {
  const { id } = useLocalSearchParams();
  const { data: pokemon } = useFetchQuery<"/pokemon/[id]">("/pokemon/[id]", { id: id as string });
  const { data: species } = useFetchQuery<"/pokemon-species/[id]">("/pokemon-species/[id]", { id: id as string });
  const mainType = pokemon?.types[0].type.name as keyof typeof Colors.type;
  const colorType = mainType ? Colors.type[mainType] : Colors.light.tint;
  const bio = species?.flavor_text_entries.find((entry) => entry.language.name === "en")?.flavor_text.replaceAll("\n", " ");

  return (
    <RootView backgroundColor={colorType}>
      <View style={styles.container}>
        <Image source={require("@/assets/images/pokeball-big.png")} style={styles.pokeball} />
        {/* Header */}
        <Row style={styles.header}>
          <Row gap={8} style={styles.pokemonName}>
            <Pressable onPress={() => router.back()}>
              <Image source={require("@/assets/images/arrow_back.png")} width={24} height={24} />
            </Pressable>
            <ThemedText variant="headline" color="grayWhite" capitalize>
              {pokemon?.name}
            </ThemedText>
          </Row>
          <Row>
            <ThemedText variant="subtitle2" color="grayWhite">
              #{pokemon?.id.toString().padStart(3, "0")}
            </ThemedText>
          </Row>
        </Row>
        {/* Image */}
        <Row style={styles.pokemonNavigation}>
          <Row style={styles.imageContainer}>
            <Pressable>
              <Image source={require("@/assets/images/chevron_left.png")} width={24} height={24} />
            </Pressable>
            <Image
              source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png` }}
              style={styles.image}
            />
            <Pressable>
              <Image source={require("@/assets/images/chevron_right.png")} width={24} height={24} />
            </Pressable>
          </Row>
        </Row>
        <Card style={styles.card}>
          {/* Types */}
          <Row style={styles.typesContainer} gap={16}>
            {pokemon?.types.map((type) => (
              <Tag key={type.type.name} type={type.type.name as keyof typeof Colors.type}>
                {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
              </Tag>
            ))}
          </Row>
          {/* About */}
          <About pokemon={pokemon as PokemonI} colorType={colorType} />
          {/* Description */}
          <Row style={styles.descriptionContainer}>
            <ThemedText variant="body3" color="grayDark">
              {bio}
            </ThemedText>
          </Row>
          {/* Stats */}
          <Stats pokemon={pokemon as PokemonI} colorType={colorType} />
        </Card>
      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pokeball: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 208,
    height: 208,
  },
  header: {
    padding: 20,
    alignItems: "center",
    height: 76,
  },
  pokemonName: {
    flex: 1,
  },
  pokemonNavigation: {
    paddingHorizontal: 20,
    height: 144,
    alignItems: "baseline",
    overflow: "visible",
  },
  imageContainer: {
    flex: 1,
    height: 200,
    zIndex: 10,
    justifyContent: "space-between",
  },
  image: {
    width: 200,
    height: 200,
    zIndex: 10,
  },
  card: {
    padding: 20,
    paddingTop: 56,
    gap: 16,
  },
  typesContainer: {
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  aboutContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  infosContainer: {
    height: 32,
    maxHeight: 32,

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
    paddingVertical: 8,
  },
  descriptionContainer: {
    minHeight: 32,
    paddingHorizontal: 12,
    paddingTop: 8,
  },
});
