import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { API_BASE } from "../constants/api";

export default function AddAdScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const submitAd = async () => {
    if (!title || !description || !price || !category) {
      Alert.alert("خطأ", "الرجاء إدخال جميع البيانات المطلوبة");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/ads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          price,
          category,
          image,
        }),
      });

      if (response.ok) {
        Alert.alert("نجاح", "تم إضافة الإعلان بنجاح ✅");
        setTitle("");
        setDescription("");
        setPrice("");
        setCategory("");
        setImage("");
      } else {
        Alert.alert("خطأ", "فشل في إضافة الإعلان ❌");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("خطأ", "حدث خطأ أثناء الاتصال بالخادم");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>➕ إضافة إعلان جديد</Text>

      <TextInput
        style={styles.input}
        placeholder="عنوان الإعلان"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="الوصف"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="السعر"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <TextInput
        style={styles.input}
        placeholder="القسم (مثل: سيارات، عقارات، حيوانات)"
        value={category}
        onChangeText={setCategory}
      />

      <TouchableOpacity style={styles.btn} onPress={pickImage}>
        <Text style={styles.btnText}>
          {image ? "✅ تم اختيار صورة" : "🖼️ اختر صورة"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnAdd} onPress={submitAd}>
        <Text style={styles.btnText}>📢 نشر الإعلان</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    textAlign: "right",
  },
  btn: {
    backgroundColor: "#6c757d",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  btnAdd: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
