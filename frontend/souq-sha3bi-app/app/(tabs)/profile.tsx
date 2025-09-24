import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";

export default function Profile() {
  const [user] = useState({
    name: "مستخدم تجريبي",
    email: "user@test.com",
    phone: "777268793",
    avatar: "https://i.pravatar.cc/150?img=12", // صورة مؤقتة
    ads: [
      { id: 1, title: "بيع تلفون سامسونج A12", price: "50,000 ريال" },
      { id: 2, title: "إيجار شقة في صنعاء", price: "120,000 ريال" },
    ],
  });

  return (
    <ScrollView style={styles.container}>
      {/* صورة البروفايل */}
      <View style={styles.header}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.info}>📧 {user.email}</Text>
        <Text style={styles.info}>📞 {user.phone}</Text>
      </View>

      {/* زر تعديل الحساب */}
      <TouchableOpacity style={styles.editBtn}>
        <Text style={styles.editText}>✏️ تعديل الحساب</Text>
      </TouchableOpacity>

      {/* إعلانات المستخدم */}
      <Text style={styles.sectionTitle}>إعلاناتي</Text>
      {user.ads.map((ad) => (
        <View key={ad.id} style={styles.adBox}>
          <Text style={styles.adTitle}>{ad.title}</Text>
          <Text style={styles.adPrice}>{ad.price}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { alignItems: "center", padding: 20, backgroundColor: "#f8f8f8" },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  name: { fontSize: 20, fontWeight: "bold" },
  info: { fontSize: 14, color: "#555" },
  editBtn: {
    backgroundColor: "#007bff",
    padding: 10,
    margin: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  editText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginLeft: 15, marginTop: 10 },
  adBox: {
    backgroundColor: "#f9f9f9",
    margin: 10,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  adTitle: { fontSize: 16, fontWeight: "bold" },
  adPrice: { fontSize: 14, color: "#28a745", marginTop: 5 },
});
