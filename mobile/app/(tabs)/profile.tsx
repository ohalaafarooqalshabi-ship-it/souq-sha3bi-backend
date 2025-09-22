import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      // 📌 نجلب بيانات المستخدم المخزنة
      const storedName = await AsyncStorage.getItem("user_name");
      const storedEmail = await AsyncStorage.getItem("user_email");

      setUser({
        name: storedName || "مستخدم السوق الشعبي",
        email: storedEmail || "email@example.com",
      });
    };

    loadUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user_name");
    await AsyncStorage.removeItem("user_email");

    Alert.alert("🚪 تسجيل الخروج", "تم تسجيل خروجك بنجاح");
    router.replace("/auth"); // يرجع لصفحة تسجيل الدخول
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>👤 الملف الشخصي</Text>

      <View style={styles.card}>
        <Text style={styles.label}>الاسم:</Text>
        <Text style={styles.value}>{user?.name}</Text>

        <Text style={styles.label}>البريد الإلكتروني:</Text>
        <Text style={styles.value}>{user?.email}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>🚪 تسجيل الخروج</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2e86de",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
  },
  label: { fontSize: 16, fontWeight: "600", marginTop: 10 },
  value: { fontSize: 16, color: "#555", marginTop: 5 },
  logoutButton: {
    backgroundColor: "#e74c3c",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
