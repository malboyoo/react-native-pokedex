import { Card } from "@/components/Card";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { Row } from "@/components/Row";
import { SearchBar } from "@/components/SearchBar";
import { ThemedText } from "@/components/ThemedText";
import { useInfiniteFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { getIdByUrl } from "@/utils/getIdByUrl";
import { useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface PokemonFast {
  name: string;
  url: string;
}

export default function Index() {
  const colors = useThemeColors();
  const [searchText, setSearchText] = useState("");

  const { data, isFetching, fetchNextPage } = useInfiniteFetchQuery("/pokemon?limit=21");
  const pokemons: PokemonFast[] = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.tint }]}>
      <Row style={styles.header} gap={16}>
        <Image source={require("@/assets/images/pokeball.png")} width={24} height={24} />
        <ThemedText variant="headline" color="grayLight">
          Pokédex
        </ThemedText>
      </Row>
      <Row>
        <SearchBar onChange={setSearchText} value={searchText} />
      </Row>

      <Card style={styles.body}>
        <FlatList
          data={pokemons}
          numColumns={3}
          columnWrapperStyle={styles.gridGap}
          contentContainerStyle={[styles.gridGap, styles.list]}
          renderItem={({ item }) => <PokemonCard id={getIdByUrl(item.url)} name={item.name} style={{ flex: 1 / 3 }} />}
          keyExtractor={(item) => getIdByUrl(item.url).toString()}
          ListFooterComponent={isFetching ? <ActivityIndicator color={colors.tint} /> : null}
          onEndReached={() => fetchNextPage()}
        />
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    gap: 16,
  },
  header: {
    paddingHorizontal: 12,
    paddingVertical: 8,
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
});
