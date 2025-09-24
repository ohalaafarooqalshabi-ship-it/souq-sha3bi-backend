import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { API_BASE } from "./constants/api";

export default function SupportScreen() {
  const [message, setMessage] = useState("");

  const sendComplaint = async () => {
    if (!message.trim()) {
      Alert.alert("تنبيه", "الرجاء كتابة محتوى الشكوى");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/support`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (res.ok) {
        Alert.alert("تم الإرسال", "تم إرسال الشكوى بنجاح ✅");
        setMessage("");
      } else {
        Alert.alert("خطأ", "حدثت مشكلة أثناء إرسال الشكوى");
      }
    } catch (err) {
      Alert.alert("خطأ", "تعذر الاتصال بالخادم");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>خدمة العملاء</Text>
      <Text style={styles.subtitle}>اكتب مشكلتك أو استفسارك وسنقوم بمراجعتها</Text>

      <TextInput
        style={styles.input}
        placeholder="اكتب رسالتك هنا..."
        value={message}
        onChangeText={setMessage}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={sendComplaint}>
        <Text style={styles.buttonText}>إرسال الشكوى</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10,
    minHeight: 100, textAlignVertical: "top", marginBottom: 15,
  },
  button: {
    backgroundColor: "#2196F3", padding: 12, borderRadius: 10, alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
}); 
