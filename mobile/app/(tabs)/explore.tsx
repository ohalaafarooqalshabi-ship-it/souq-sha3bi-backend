import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const categories = [
  { id: "1", name: "🚗 سيارات" },
  { id: "2", name: "🏠 عقارات" },
  { id: "3", name: "📱 إلكترونيات" },
  { id: "4", name: "🐾 حيوانات" },
  { id: "5", name: "🛍️ أخرى" },
];

const allAds = [
  { id: "101", title: "هونداي 2019", price: "12,000$", location: "صنعاء", category: "🚗 سيارات" },
  { id: "102", title: "شقة في حدة", price: "700$", location: "صنعاء", category: "🏠 عقارات" },
  { id: "103", title: "iPhone 14", price: "1,000$", location: "عدن", category: "📱 إلكترونيات" },
  { id: "104", title: "قط شيرازي", price: "250$", location: "تعز", category: "🐾 حيوانات" },
];

export default function ExploreScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const router = useRouter();

  const filteredAds = selectedCategory
    ? allAds.filter((ad) => ad.category === selectedCategory)
    : allAds;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🔎 استكشاف الإعلانات</Text>

      {/* 🏷️ الأقسام */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === item.name && styles.activeCategory,
            ]}
            onPress={() =>
              setSelectedCategory(selectedCategory === item.name ? null : item.name)
            }
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === item.name && { color: "#fff" },
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* 📋 الإعلانات */}
      <FlatList
        data={filteredAds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.adCard}
            onPress={() => router.push({ pathname: "/(tabs)/adDetails", params: item })}
          >
            <Text style={styles.adTitle}>{item.title}</Text>
            <Text style={styles.adPrice}>{item.price}</Text>
            <Text style={styles.adLocation}>📍 {item.location}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.noAds}>❌ لا توجد إعلانات في هذا القسم</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  header: { fontSize: 20, fontWeight: "bold", color: "#2e86de", marginBottom: 15 },
  categoryButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#f1f1f1",
    marginRight: 10,
  },
  activeCategory: { backgroundColor: "#2e86de" },
  categoryText: { fontSize: 14, fontWeight: "600", color: "#333" },
  adCard: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  adTitle: { fontSize: 16, fontWeight: "bold" },
  adPrice: { fontSize: 14, color: "#27ae60", marginTop: 5 },
  adLocation: { fontSize: 12, color: "#555", marginTop: 3 },
  noAds: { textAlign: "center", marginTop: 20, color: "#777" },
});
