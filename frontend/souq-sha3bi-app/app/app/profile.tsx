import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { OWNER_NAME, OWNER_PHONE } from "./constants/api";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>الملف الشخصي</Text>

      {/* صورة افتراضية للبروفايل */}
      <Image
        source={{ uri: "https://i.ibb.co/9VHtVZb/profile.png" }}
        style={styles.avatar}
      />

      {/* بيانات المستخدم */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>الاسم:</Text>
        <Text style={styles.value}>{OWNER_NAME}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>رقم الهاتف:</Text>
        <Text style={styles.value}>{OWNER_PHONE}</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>إعلاناتي</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: "#f44336" }]}>
        <Text style={styles.buttonText}>تسجيل الخروج</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  infoBox: { flexDirection: "row", marginBottom: 10 },
  label: { fontWeight: "bold", fontSize: 16, marginRight: 5 },
  value: { fontSize: 16, color: "#555" },
  button: {
    backgroundColor: "#4CAF50", padding: 12, borderRadius: 10, alignItems: "center",
    marginTop: 15, width: "80%",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
}); 
