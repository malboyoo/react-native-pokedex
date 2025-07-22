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
import { Audio } from "expo-av";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";

export default function Pokemon() {
  const [id, setId] = useState(Number(useLocalSearchParams().id));

  return (
    <PagerView
      initialPage={1}
      style={{ flex: 1 }}
      onPageSelected={(e) => {
        if (e.nativeEvent.position === 0 && id > 1) {
          setId(id - 1);
        }
        if (e.nativeEvent.position === 2 && id < 1010) {
          setId(id + 1);
        }
      }}
    >
      <PokemonView id={id - 1} key={`pokemon-${id - 1}`} />
      <PokemonView id={id} key={`pokemon-${id}`} />
      <PokemonView id={id + 1} key={`pokemon-${id + 1}`} />
    </PagerView>
  );
}

export function PokemonView({ id }: { id: number }) {
  const { data: pokemon } = useFetchQuery<"/pokemon/[id]">("/pokemon/[id]", { id: id });
  const { data: species } = useFetchQuery<"/pokemon-species/[id]">("/pokemon-species/[id]", { id: id });
  const mainType = pokemon?.types[0].type?.name as keyof typeof Colors.type;
  const colorType = mainType ? Colors.type[mainType] : Colors.light.tint;
  const bio = species?.flavor_text_entries.find((entry) => entry.language?.name === "en")?.flavor_text.replaceAll("\n", " ");

  const playSound = async () => {
    const cry = pokemon?.cries.latest;
    if (cry) {
      const { sound } = await Audio.Sound.createAsync({ uri: cry }, { shouldPlay: true });
      await sound.playAsync();
    }
  };

  const onPreviousPokemon = () => {
    if (pokemon?.id && pokemon.id > 1) {
      router.push(`/pokemon/${pokemon.id - 1}`);
    }
  };
  const onNextPokemon = () => {
    if (pokemon?.id && pokemon.id < 1010) {
      router.push(`/pokemon/${pokemon?.id + 1}`);
    }
  };

  return (
    <RootView backgroundColor={colorType}>
      <View style={styles.container}>
        <Image source={require("@/assets/images/pokeball-big.png")} style={styles.pokeball} />
        {/* Header */}
        <Row style={styles.header}>
          <Row gap={8} style={styles.pokemonName}>
            <Pressable onPress={() => router.push("/")}>
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
            <Pressable onPress={() => onPreviousPokemon()}>
              {pokemon?.id && pokemon.id > 1 && <Image source={require("@/assets/images/chevron_left.png")} width={24} height={24} />}
            </Pressable>
            <Pressable onPress={playSound} hitSlop={5}>
              <Image
                source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png` }}
                style={styles.image}
              />
            </Pressable>
            <Pressable onPress={() => onNextPokemon()}>
              <Image source={require("@/assets/images/chevron_right.png")} width={24} height={24} />
            </Pressable>
          </Row>
        </Row>
        <Card style={styles.card}>
          {/* Types */}
          <Row style={styles.typesContainer} gap={16}>
            {pokemon?.types.map((type) => (
              <Tag key={type.type?.name} type={type.type?.name as keyof typeof Colors.type}>
                {type.type?.name?.charAt(0).toUpperCase() + type.type?.name?.slice(1)}
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
