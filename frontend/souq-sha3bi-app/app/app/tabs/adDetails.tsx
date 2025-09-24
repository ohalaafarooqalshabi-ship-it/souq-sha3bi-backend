import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { OWNER_NAME, OWNER_PHONE } from "../constants/api";

export default function AdDetailsScreen() {
  const { title, description, price, category, image, phone } = useLocalSearchParams();

  const handleCall = () => {
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: image || "https://via.placeholder.com/300" }}
        style={styles.image}
      />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>{price} ريال</Text>
      <Text style={styles.category}>📂 القسم: {category}</Text>
      <Text style={styles.description}>{description}</Text>

      {phone && (
        <TouchableOpacity style={styles.btn} onPress={handleCall}>
          <Text style={styles.btnText}>📞 اتصل بصاحب الإعلان</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.footer}>
        👨‍💻 التطبيق من تطوير {OWNER_NAME} - 📞 {OWNER_PHONE}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    marginBottom: 5,
    textAlign: "center",
  },
  category: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: "#444",
  },
  btn: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    fontSize: 12,
    color: "#777",
    textAlign: "center",
    marginTop: 20,
  },
}); 
