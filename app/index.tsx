import { Card } from "@/components/Card";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { RootView } from "@/components/RouteView";
import { Row } from "@/components/Row";
import { SearchBar } from "@/components/SearchBar";
import { SortButton } from "@/components/SortButton";
import { ThemedText } from "@/components/ThemedText";
import { useInfiniteFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { getIdByUrl } from "@/utils/getIdByUrl";
import { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet } from "react-native";

interface PokemonFast {
  name: string;
  url: string;
}

export default function Index() {
  const colors = useThemeColors();
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState<"id" | "name">("id");

  const { data, isFetching, fetchNextPage } = useInfiniteFetchQuery("/pokemon?limit=21");
  const pokemons: PokemonFast[] = data?.pages.flatMap((page) => page.results) ?? [];

  const filteredPokemons = pokemons.filter(
    (pokemon) => pokemon.name.includes(searchText.toLowerCase()) || getIdByUrl(pokemon.url).toString().includes(searchText.toLowerCase())
  );

  const sortedAndFilteredPokemons = useMemo(() => {
    if (sort === "name") {
      return filteredPokemons.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    return filteredPokemons;
  }, [filteredPokemons, sort]);

  return (
    <RootView>
      <Row style={styles.header} gap={16}>
        <Image source={require("@/assets/images/pokeball.png")} width={24} height={24} />
        <ThemedText variant="headline" color="grayLight">
          Pokédex
        </ThemedText>
      </Row>
      <Row gap={16} style={styles.searchBar}>
        <SearchBar onChange={setSearchText} value={searchText} />
        <SortButton onChange={setSort} value={sort} />
      </Row>

      <Card style={styles.body}>
        <FlatList
          data={sortedAndFilteredPokemons}
          numColumns={3}
          columnWrapperStyle={styles.gridGap}
          contentContainerStyle={[styles.gridGap, styles.list]}
          renderItem={({ item }) => <PokemonCard id={getIdByUrl(item.url)} name={item.name} style={{ flex: 1 / 3 }} />}
          keyExtractor={(item) => getIdByUrl(item.url).toString()}
          ListFooterComponent={isFetching ? <ActivityIndicator color={colors.tint} /> : null}
          onEndReached={searchText.length > 0 ? undefined : () => fetchNextPage()}
        />
      </Card>
    </RootView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  body: {
    flex: 1,
    marginTop: 16,
  },
  gridGap: {
    gap: 8,
  },
  list: {
    padding: 12,
  },
  searchBar: {
    paddingHorizontal: 12,
  },
});
