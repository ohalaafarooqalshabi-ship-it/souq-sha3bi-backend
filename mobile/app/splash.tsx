import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      // ⏳ نخلي شاشة السبلاش تظهر ثانيتين قبل التوجيه
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const token = await AsyncStorage.getItem("token");
      if (token) {
        router.replace("/(tabs)"); // ✅ لو فيه تسجيل دخول → يدخل التطبيق
      } else {
        router.replace("/auth"); // ❌ لو ما فيه → يروح لشاشة auth
      }
    };

    checkAuth();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🛍️ السوق الشعبي</Text>
      <ActivityIndicator size="large" color="#2e86de" style={{ marginTop: 20 }} />
      <Text style={styles.footer}>إعداد: علاء فاروق سيف علوان الشعبي</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  logo: { fontSize: 28, fontWeight: "bold", color: "#2e86de" },
  footer: { marginTop: 40, fontSize: 12, color: "#777" },
});
