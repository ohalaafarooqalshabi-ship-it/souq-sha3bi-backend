import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { API_BASE } from "./constants/api";

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    if (!phone || !password || (!isLogin && !name)) {
      Alert.alert("تنبيه", "يرجى إدخال جميع البيانات المطلوبة");
      return;
    }

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const response = await fetch(API_BASE + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("نجاح ✅", isLogin ? "تم تسجيل الدخول" : "تم إنشاء الحساب");
      } else {
        Alert.alert("خطأ ❌", data.message || "حدث خطأ ما");
      }
    } catch (error) {
      Alert.alert("خطأ", "تعذر الاتصال بالخادم");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? "تسجيل الدخول" : "إنشاء حساب جديد"}</Text>

      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="الاسم الكامل"
          value={name}
          onChangeText={setName}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="رقم الهاتف"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        style={styles.input}
        placeholder="كلمة المرور"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>{isLogin ? "دخول" : "تسجيل"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.switchText}>
          {isLogin ? "ليس لديك حساب؟ أنشئ حساب" : "لديك حساب؟ سجل دخول"}
        </Text>
      </TouchableOpacity>

      {/* أزرار تسجيل الدخول عبر فيسبوك وجيميل (تصميم فقط الآن) */}
      <View style={styles.socialContainer}>
        <TouchableOpacity style={[styles.socialButton, { backgroundColor: "#1877F2" }]}>
          <Text style={styles.socialText}>دخول عبر فيسبوك</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.socialButton, { backgroundColor: "#DB4437" }]}>
          <Text style={styles.socialText}>دخول عبر جيميل</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: {
    borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 10, marginBottom: 15,
  },
  button: {
    backgroundColor: "#4CAF50", padding: 15, borderRadius: 10, alignItems: "center", marginBottom: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  switchText: { textAlign: "center", color: "#007BFF", marginTop: 10 },
  socialContainer: { marginTop: 20 },
  socialButton: {
    padding: 12, borderRadius: 10, alignItems: "center", marginBottom: 10,
  },
  socialText: { color: "#fff", fontWeight: "bold" },
});
