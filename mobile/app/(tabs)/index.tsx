import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

const categories = [
  { id: "1", name: "🚗 سيارات" },
  { id: "2", name: "🏠 عقارات" },
  { id: "3", name: "📱 إلكترونيات" },
  { id: "4", name: "🐾 حيوانات" },
  { id: "5", name: "🛍️ أخرى" },
];

const featuredAds = [
  { id: "101", title: "سيارة تويوتا 2020", price: "15,000$", location: "صنعاء" },
  { id: "102", title: "شقة للإيجار - حدة", price: "500$", location: "صنعاء" },
];

const latestAds = [
  { id: "201", title: "هاتف iPhone 13 Pro", price: "800$", location: "تعز" },
  { id: "202", title: "غنم بلدي للبيع", price: "150$", location: "إب" },
  { id: "203", title: "لابتوب Dell جديد", price: "600$", location: "عدن" },
];

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* 🔍 البحث */}
      <TextInput
        style={styles.searchInput}
        placeholder="ابحث عن إعلان..."
        value={search}
        onChangeText={setSearch}
      />

      {/* 🏷️ الأقسام */}
      <Text style={styles.sectionTitle}>الأقسام</Text>
      <View style={styles.categoriesContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={styles.categoryCard}
            onPress={() => router.push("/(tabs)/explore")}
          >
            <Text style={styles.categoryText}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ⭐ الإعلانات المميزة */}
      <Text style={styles.sectionTitle}>إعلانات مميزة</Text>
      <FlatList
        data={featuredAds}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.adCard}
            onPress={() => router.push("/(tabs)/adDetails")}
          >
            <Text style={styles.adTitle}>{item.title}</Text>
            <Text style={styles.adPrice}>{item.price}</Text>
            <Text style={styles.adLocation}>{item.location}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />

      {/* 📜 آخر الإعلانات */}
      <Text style={styles.sectionTitle}>آخر الإعلانات</Text>
      {latestAds.map((ad) => (
        <TouchableOpacity
          key={ad.id}
          style={styles.latestAdCard}
          onPress={() => router.push("/(tabs)/adDetails")}
        >
          <Text style={styles.adTitle}>{ad.title}</Text>
          <Text style={styles.adPrice}>{ad.price}</Text>
          <Text style={styles.adLocation}>{ad.location}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#2e86de",
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  categoryCard: {
    width: "48%",
    backgroundColor: "#f1f1f1",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
  },
  categoryText: { fontSize: 16, fontWeight: "600" },
  adCard: {
    backgroundColor: "#eaf4ff",
    padding: 15,
    borderRadius: 12,
    marginRight: 10,
    width: 180,
  },
  adTitle: { fontSize: 16, fontWeight: "bold" },
  adPrice: { fontSize: 14, color: "#2e86de", marginTop: 5 },
  adLocation: { fontSize: 12, color: "#555", marginTop: 3 },
  latestAdCard: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
});
