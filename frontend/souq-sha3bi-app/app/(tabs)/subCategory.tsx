import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function SubCategoryScreen() {
  const { name, sub } = useLocalSearchParams();
  const subCategories = JSON.parse(sub as string);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📂 {name}</Text>
      <FlatList
        data={subCategories}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/ads",
                params: { category: item },
              })
            }
          >
            <Text style={styles.title}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  card: {
    backgroundColor: "#f0f0f0",
    marginVertical: 8,
    padding: 15,
    borderRadius: 10,
  },
  title: { fontSize: 18, fontWeight: "600" },
});
