import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function AdDetails() {
  const { id, title, price, category, image } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>
      {/* صورة الإعلان */}
      <Image
        source={{ uri: image || "https://via.placeholder.com/400" }}
        style={styles.image}
      />

      {/* عنوان الإعلان */}
      <Text style={styles.title}>{title}</Text>

      {/* التصنيف + السعر */}
      <Text style={styles.meta}>
        🏷️ {category} {"   "} 💰 {price} ريال
      </Text>

      {/* وصف الإعلان */}
      <Text style={styles.sectionHeader}>وصف الإعلان</Text>
      <Text style={styles.description}>
        هذا وصف تجريبي، مستقبلاً هيظهر هنا الوصف الكامل القادم من قاعدة البيانات.
      </Text>

      {/* زر الاتصال بالمعلن */}
      <TouchableOpacity
        style={styles.callButton}
        onPress={() => Linking.openURL(`tel:777268793`)} // ← لاحقاً يتغير حسب رقم البائع
      >
        <Text style={styles.callText}>📞 اتصل بالمعلن</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 12 },
  image: { width: "100%", height: 250, borderRadius: 10, marginBottom: 15 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 5, textAlign: "center" },
  meta: { fontSize: 16, color: "#666", marginBottom: 15, textAlign: "center" },
  sectionHeader: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  description: { fontSize: 16, lineHeight: 22, color: "#333", marginBottom: 20 },
  callButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  callText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
