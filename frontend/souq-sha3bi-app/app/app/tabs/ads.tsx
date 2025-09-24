import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import { API_BASE } from "../constants/api";

export default function AdsScreen() {
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // جلب الإعلانات من السيرفر
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch(`${API_BASE}/ads`);
        const data = await res.json();
        setAds(data);
      } catch (err) {
        console.error("خطأ أثناء جلب الإعلانات:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, []);

  // شكل الإعلان
  const renderAd = ({ item }: any) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc}>{item.description}</Text>
      <Text style={styles.price}>{item.price} ريال</Text>
      <Text style={styles.owner}>📞 {item.phone}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛒 الإعلانات</Text>
      {loading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <FlatList
          data={ads}
          renderItem={renderAd}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<Text style={styles.empty}>لا توجد إعلانات حالياً</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  desc: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
  },
  owner: {
    fontSize: 14,
    color: "#444",
    marginTop: 5,
  },
  empty: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 20,
  },
});
