import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Pokemon() {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Pokemon {id}</Text>
    </View>
  );
}
