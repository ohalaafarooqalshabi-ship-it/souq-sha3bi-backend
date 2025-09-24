import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function AdDetails() {
  const { id, title, price, category, image } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image || "https://via.placeholder.com/300" }}
        style={styles.image}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>{price} ريال</Text>
      <Text style={styles.category}>📂 {category}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openURL(`tel:777268793`)} // رقمك للتواصل
      >
        <Text style={styles.buttonText}>📞 اتصل بالمعلن</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  image: { width: "100%", height: 250, borderRadius: 12, marginBottom: 15 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  price: { fontSize: 20, color: "green", marginBottom: 8, textAlign: "center" },
  category: { fontSize: 18, color: "#666", marginBottom: 20, textAlign: "center" },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
