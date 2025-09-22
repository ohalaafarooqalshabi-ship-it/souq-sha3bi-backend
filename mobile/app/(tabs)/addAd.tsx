import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

export default function AddAdScreen() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");

  const router = useRouter();

  const handleAddAd = () => {
    if (!title || !price || !location || !phone) {
      Alert.alert("⚠️ تنبيه", "يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }

    // 🔹 هنا مستقبلاً نربطها مع Backend أو قاعدة بيانات
    const newAd = {
      id: Date.now().toString(),
      title,
      price,
      location,
      description,
      phone,
    };

    console.log("✅ إعلان جديد:", newAd);

    Alert.alert("🎉 نجاح", "تم إضافة الإعلان بنجاح");
    router.replace("/(tabs)/ads"); // يرجع لصفحة الإعلانات
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>➕ إضافة إعلان جديد</Text>

      <TextInput
        style={styles.input}
        placeholder="عنوان الإعلان *"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="السعر *"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="الموقع *"
        value={location}
        onChangeText={setLocation}
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="الوصف"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="رقم الهاتف *"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.button} onPress={handleAddAd}>
        <Text style={styles.buttonText}>✅ إضافة الإعلان</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2e86de",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#2e86de",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
