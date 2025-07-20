import { Shadows } from "@/constants/Shadows";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useState } from "react";
import { Image, Modal, Pressable, StyleSheet, View } from "react-native";
import { Card } from "./Card";
import { Radio } from "./Radio";
import { Row } from "./Row";
import { ThemedText } from "./ThemedText";

type Props = {
  onChange: (value: "id" | "name") => void;
  value: "id" | "name";
};

const sortOptions = [
  {
    label: "ID",
    value: "id",
  },
  {
    label: "Name",
    value: "name",
  },
];

export function SortButton({ onChange, value }: Props) {
  const colors = useThemeColors();
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <>
      <Pressable onPress={() => setIsModalVisible(true)}>
        <View style={[styles.button, { backgroundColor: colors.grayWhite }]}>
          <Image source={value === "id" ? require("@/assets/images/tag.png") : require("@/assets/images/text_format.png")} width={16} height={16} />
        </View>
      </Pressable>
      <Modal visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)} transparent animationType="fade">
        <Pressable style={styles.backdrop} onPress={() => setIsModalVisible(false)}></Pressable>
        <View style={[styles.modal, { backgroundColor: colors.tint }]}>
          <ThemedText variant="subtitle2" color="grayWhite" style={styles.title}>
            Sort by :
          </ThemedText>
          <Card style={styles.card}>
            {sortOptions.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => onChange(option.value as typeof value)}
                android_ripple={{ color: colors.grayWhite, foreground: true }}
              >
                <Row key={option.value} gap={8}>
                  <Radio checked={value === option.value} />
                  <ThemedText variant="subtitle2">{option.label}</ThemedText>
                </Row>
              </Pressable>
            ))}
          </Card>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 32,
    height: 32,
    borderRadius: 16,
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: 113,
    borderRadius: 12,
    padding: 4,
    paddingTop: 12,
    gap: 16,
    position: "absolute",
    top: 95,
    right: 16,
    ...Shadows.dp2,
  },
  title: {
    paddingHorizontal: 16,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  card: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 16,
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
});
