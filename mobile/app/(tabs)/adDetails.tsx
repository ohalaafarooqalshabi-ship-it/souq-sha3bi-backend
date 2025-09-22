import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Linking } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function AdDetailsScreen() {
  const { id, title, price, location, image, description, phone } = useLocalSearchParams();
  const router = useRouter();

  // 📞 فتح الواتساب أو الاتصال
  const handleContact = () => {
    if (phone) {
      Linking.openURL(`https://wa.me/${phone}`);
    } else {
      alert("رقم المعلن غير متوفر 🚫");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* صورة الإعلان */}
      <Image
        source={{ uri: image || "https://via.placeholder.com/300" }}
        style={styles.adImage}
      />

      {/* تفاصيل الإعلان */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title || "إعلان"}</Text>
        <Text style={styles.price}>{price || "غير محدد"}</Text>
        <Text style={styles.location}>📍 {location || "غير محدد"}</Text>
        <Text style={styles.description}>
          {description ||
            "لا يوجد وصف للإعلان. يمكنك تعديل النص ليتناسب مع تفاصيل كل إعلان (مواصفات السيارة، حالة المنتج، تفاصيل الأرض ...)."}
        </Text>

        {/* زر التواصل */}
        <TouchableOpacity style={styles.contactButton} onPress={handleContact}>
          <Text style={styles.contactText}>📞 تواصل مع المعلن</Text>
        </TouchableOpacity>

        {/* زر رجوع */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>⬅️ رجوع</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  adImage: { width: "100%", height: 250, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 },
  detailsContainer: { padding: 15 },
  title: { fontSize: 22, fontWeight: "bold", color: "#2e86de", marginBottom: 8 },
  price: { fontSize: 20, color: "#27ae60", marginBottom: 5 },
  location: { fontSize: 14, color: "#555", marginBottom: 15 },
  description: { fontSize: 16, color: "#333", lineHeight: 22, marginBottom: 20 },
  contactButton: {
    backgroundColor: "#27ae60",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  contactText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  backButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  backText: { color: "#333", fontSize: 14 },
});
