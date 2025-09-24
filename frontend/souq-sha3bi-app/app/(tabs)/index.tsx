import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { OWNER_NAME, OWNER_PHONE } from "../constants/api";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🎉 أهلاً بك في السوق الشعبي</Text>
      <Text style={styles.subHeader}>تصفح وأضف إعلاناتك بكل سهولة</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/addAd")}
      >
        <Text style={styles.buttonText}>➕ إضافة إعلان جديد</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/adDetails")}
      >
        <Text style={styles.buttonText}>📢 مشاهدة إعلان تجريبي</Text>
      </TouchableOpacity>

      <View style={styles.ownerBox}>
        <Text style={styles.ownerTitle}>👨‍💻 مطور التطبيق</Text>
        <Text style={styles.ownerText}>{OWNER_NAME}</Text>
        <Text style={styles.ownerText}>📞 {OWNER_PHONE}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  subHeader: { fontSize: 16, textAlign: "center", marginBottom: 20, color: "#555" },
  button: {
    backgroundColor: "#008000",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
  ownerBox: {
    marginTop: 30,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
  },
  ownerTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  ownerText: { fontSize: 14, color: "#333" },
});
