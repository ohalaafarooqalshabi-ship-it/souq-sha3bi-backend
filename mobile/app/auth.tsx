import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AuthScreen() {
  // 🔄 تبديل بين تسجيل دخول / تسجيل جديد
  const [isLogin, setIsLogin] = useState(true);

  // 📝 بيانات المستخدم
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  // 🚀 تنفيذ تسجيل الدخول أو إنشاء حساب
  const handleAuth = async () => {
    if (!email || !password || (!isLogin && !name)) {
      Alert.alert("تنبيه", "يرجى إدخال جميع الحقول");
      return;
    }

    try {
      // 🔐 هنا فيما بعد تقدر تستبدل بالـ Backend API
      const token = "demo_token_123"; // مؤقت للتجربة
      await AsyncStorage.setItem("token", token);

      Alert.alert("نجاح", isLogin ? "تم تسجيل الدخول ✅" : "تم إنشاء الحساب 🎉");
      router.replace("/(tabs)"); // ينتقل للواجهة الرئيسية
    } catch (err) {
      Alert.alert("خطأ", "حدث خطأ غير متوقع");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 🛍️ شعار التطبيق */}
      <Text style={styles.title}>🛍️ السوق الشعبي</Text>
      <Text style={styles.subtitle}>
        {isLogin ? "تسجيل الدخول إلى حسابك" : "إنشاء حساب جديد"}
      </Text>

      {/* 🧑‍💻 إدخال الاسم فقط في حالة إنشاء حساب جديد */}
      {!isLogin && (
        <TextInput
          placeholder="الاسم الكامل"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
      )}

      {/* 📧 إدخال البريد */}
      <TextInput
        placeholder="البريد الإلكتروني"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />

      {/* 🔑 إدخال كلمة المرور */}
      <TextInput
        placeholder="كلمة المرور"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      {/* زر تسجيل الدخول/التسجيل */}
      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>
          {isLogin ? "تسجيل الدخول" : "إنشاء حساب"}
        </Text>
      </TouchableOpacity>

      {/* 🔄 التبديل بين تسجيل دخول / حساب جديد */}
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.switchText}>
          {isLogin ? "ليس لديك حساب؟ سجل الآن" : "لديك حساب؟ سجل دخول"}
        </Text>
      </TouchableOpacity>

      {/* 🔹 تسجيل عبر Google و Facebook */}
      <View style={styles.socialContainer}>
        <TouchableOpacity style={[styles.socialButton, { backgroundColor: "#db4a39" }]}>
          <Text style={styles.socialText}>Google دخول عبر</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialButton, { backgroundColor: "#3b5998" }]}>
          <Text style={styles.socialText}>Facebook دخول عبر</Text>
        </TouchableOpacity>
      </View>

      {/* 📌 بصمة ملكية */}
      <Text style={styles.footer}>إعداد: علاء فاروق سيف علوان الشعبي</Text>
    </ScrollView>
  );
}

// 🎨 التنسيقات
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2e86de",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    width: "100%",
    backgroundColor: "#2e86de",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  switchText: { color: "#2e86de", marginTop: 10, fontSize: 14 },
  socialContainer: {
    marginTop: 20,
    width: "100%",
  },
  socialButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  socialText: { color: "#fff", fontWeight: "bold" },
  footer: {
    marginTop: 30,
    fontSize: 12,
    color: "#777",
    textAlign: "center",
  },
});
