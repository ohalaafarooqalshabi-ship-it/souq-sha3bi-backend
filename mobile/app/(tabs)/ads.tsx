import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

const allAds = [
  {
    id: "1",
    title: "🚗 سيارة هونداي 2018",
    price: "10,000$",
    location: "صنعاء",
    image: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Hyundai",
  },
  {
    id: "2",
    title: "🐱 قط هيمالايا للبيع",
    price: "200$",
    location: "عدن",
    image: "https://via.placeholder.com/150/FF00FF/FFFFFF?text=Cat",
  },
  {
    id: "3",
    title: "🏠 أرض للبيع - الحديدة",
    price: "20,000$",
    location: "الحديدة",
    image: "https://via.placeholder.com/150/008000/FFFFFF?text=Land",
  },
  {
    id: "4",
    title: "🎮 PS5 مستعمل",
    price: "400$",
    location: "تعز",
    image: "https://via.placeholder.com/150/FF0000/FFFFFF?text=PS5",
  },
  {
    id: "5",
    title: "🐄 بقره حلوب",
    price: "500$",
    location: "إب",
    image: "https://via.placeholder.com/150/FFA500/FFFFFF?text=Cow",
  },
];

export default function AdsScreen() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredAds = allAds.filter(
    (ad) =>
      ad.title.toLowerCase().includes(search.toLowerCase()) ||
      ad.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📢 جميع الإعلانات</Text>

      {/* 🔍 البحث */}
      <TextInput
        style={styles.searchInput}
        placeholder="ابحث باسم الإعلان أو الموقع..."
        value={search}
        onChangeText={setSearch}
      />

      {/* 📋 عرض الإعلانات */}
      <FlatList
        data={filteredAds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.adCard}>
            <Image source={{ uri: item.image }} style={styles.adImage} />
            <View style={styles.adContent}>
              <Text style={styles.adTitle}>{item.title}</Text>
              <Text style={styles.adPrice}>{item.price}</Text>
              <Text style={styles.adLocation}>📍 {item.location}</Text>

              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/adDetails",
                    params: {
                      id: item.id,
                      title: item.title,
                      price: item.price,
                      category: "غير محدد",
                      image: item.image,
                    },
                  })
                }
              >
                <Text style={styles.detailsText}>عرض التفاصيل</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.noResults}>لا توجد نتائج مطابقة 🔎</Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#2e86de",
    textAlign: "center",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  adCard: {
    flexDirection: "row",
    backgroundColor: "#fdfdfd",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  adImage: { width: 100, height: 100 },
  adContent: { flex: 1, padding: 10 },
  adTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
  adPrice: { fontSize: 14, color: "#2e86de", marginTop: 5 },
  adLocation: { fontSize: 12, color: "#555", marginTop: 3 },
  detailsButton: {
    marginTop: 8,
    backgroundColor: "#2e86de",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  detailsText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
  noResults: { textAlign: "center", marginTop: 20, color: "#777" },
});
