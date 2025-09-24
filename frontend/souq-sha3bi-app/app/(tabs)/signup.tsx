import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { API_BASE, OWNER_NAME, OWNER_PHONE } from "../constants/api";

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert("تنبيه", "يرجى ملء جميع الحقول");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        Alert.alert("نجاح ✅", "تم إنشاء الحساب بنجاح");
        router.push("/(tabs)/login");
      } else {
        Alert.alert("خطأ ❌", data.message || "فشل التسجيل");
      }
    } catch (err) {
      Alert.alert("خطأ", "تعذر الاتصال بالخادم");
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>إنشاء حساب جديد</Text>

      <TextInput
        style={styles.input}
        placeholder="الاسم الكامل"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="البريد الإلكتروني"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="كلمة المرور"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>إنشاء الحساب</Text>
      </TouchableOpacity>

      {/* 🔹 بيانات المالك للتواصل */}
      <Text style={styles.owner}>
        مطور التطبيق: {OWNER_NAME} 📞 {OWNER_PHONE}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 15,
    textAlign: "right"
  },
  button: { backgroundColor: "#28a745", padding: 15, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  owner: { marginTop: 30, textAlign: "center", fontSize: 14, color: "gray" },
});
