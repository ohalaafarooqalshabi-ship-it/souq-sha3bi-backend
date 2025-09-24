import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { API_BASE } from "../constants/api";

export default function SupportScreen() {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) {
      Alert.alert("تنبيه", "الرجاء كتابة رسالتك أولاً");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/support`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (res.ok) {
        Alert.alert("✅ تم الإرسال", "تم إرسال رسالتك بنجاح");
        setMessage("");
      } else {
        Alert.alert("❌ خطأ", "فشل في إرسال الرسالة");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("❌ خطأ", "تعذر الاتصال بالخادم");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📩 خدمة العملاء</Text>
      <Text style={styles.subtitle}>أرسل مشكلتك أو استفسارك</Text>

      <TextInput
        style={styles.input}
        placeholder="اكتب رسالتك هنا..."
        value={message}
        onChangeText={setMessage}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={sendMessage}>
        <Text style={styles.buttonText}>إرسال</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  subtitle: { fontSize: 16, marginBottom: 20, textAlign: "center", color: "#555" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    height: 120,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
