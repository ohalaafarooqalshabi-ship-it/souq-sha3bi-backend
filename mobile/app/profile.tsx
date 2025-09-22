import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    Alert.alert("تسجيل خروج", "تم تسجيل خروجك بنجاح");
    router.replace("/auth"); // يرجع لصفحة تسجيل الدخول
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>الملف الشخصي</Text>

      {user ? (
        <>
          <Text style={styles.label}>👤 الاسم: {user.name}</Text>
          <Text style={styles.label}>📧 الايميل: {user.email}</Text>

          <View style={{ marginTop: 20 }}>
            <Button
              title="✏️ تعديل البيانات"
              onPress={() => Alert.alert("قريبًا", "ميزة تعديل البيانات قيد التطوير")}
              color="#1565c0"
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <Button title="🚪 تسجيل خروج" onPress={handleLogout} color="#d32f2f" />
          </View>
        </>
      ) : (
        <Text style={styles.label}>لا يوجد بيانات مستخدم</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#2e7d32",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
  },
});
