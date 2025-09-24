import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

const categories = [
  { id: "1", name: "حيوانات", image: "https://cdn-icons-png.flaticon.com/512/616/616408.png", sub: ["قطط", "كلاب", "طيور", "غنم", "أبقار"] },
  { id: "2", name: "عقارات", image: "https://cdn-icons-png.flaticon.com/512/809/809957.png", sub: ["شقق", "منازل", "أراضي", "مكاتب"] },
  { id: "3", name: "سيارات", image: "https://cdn-icons-png.flaticon.com/512/743/743131.png", sub: ["صالون", "باصات", "دراجات", "قطع غيار"] },
  { id: "4", name: "الكترونيات", image: "https://cdn-icons-png.flaticon.com/512/1041/1041916.png", sub: ["جوالات", "لابتوبات", "شاشات", "أجهزة منزلية"] },
  { id: "5", name: "أثاث", image: "https://cdn-icons-png.flaticon.com/512/3176/3176366.png", sub: ["غرف نوم", "غرف جلوس", "مكاتب", "مطابخ"] },
  { id: "6", name: "ملابس", image: "https://cdn-icons-png.flaticon.com/512/892/892458.png", sub: ["رجالي", "نسائي", "أطفال"] },
];

export default function CategoriesScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📂 الأقسام الرئيسية</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({ pathname: "/(tabs)/subCategory", params: { name: item.name, sub: JSON.stringify(item.sub) } })
            }
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.name}</Text>
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
    flex: 1,
    backgroundColor: "#f9f9f9",
    margin: 8,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },
  image: { width: 70, height: 70, marginBottom: 10 },
  title: { fontSize: 16, fontWeight: "bold" },
});
