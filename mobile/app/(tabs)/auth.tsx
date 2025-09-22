import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

export default function AuthScreen() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = () => {
    if (!email || !password) {
      Alert.alert("⚠️ خطأ", "الرجاء إدخال البريد وكلمة المرور");
      return;
    }

    if (isLogin) {
      Alert.alert("✅ تم", "تم تسجيل الدخول بنجاح!");
      router.push("/(tabs)");
    } else {
      Alert.alert("✅ تم", "تم إنشاء الحساب بنجاح!");
      router.push("/(tabs)");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isLogin ? "تسجيل الدخول" : "إنشاء حساب"}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="✉️ البريد الإلكتروني"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="🔒 كلمة المرور"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={{ marginVertical: 10 }}>
        <Button
          title={isLogin ? "تسجيل الدخول" : "إنشاء حساب"}
          onPress={handleAuth}
          color="#2e7d32"
        />
      </View>

      <Text
        style={styles.switchText}
        onPress={() => setIsLogin(!isLogin)}
      >
        {isLogin
          ? "ليس لديك حساب؟ اضغط هنا للتسجيل"
          : "لديك حساب بالفعل؟ اضغط هنا لتسجيل الدخول"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2e7d32",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  switchText: {
    textAlign: "center",
    marginTop: 15,
    color: "#1565c0",
    textDecorationLine: "underline",
  },
});
