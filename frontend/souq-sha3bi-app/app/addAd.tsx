import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function AddAd() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  // 📸 اختيار صورة من المعرض
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // 📨 إرسال الإعلان إلى السيرفر
  const submitAd = async () => {
    if (!title || !price || !category) {
      Alert.alert("خطأ", "الرجاء إدخال جميع الحقول");
      return;
    }

    try {
      const res = await fetch(
        "https://souq-sha3bi-backend-2.onrender.com/api/ads",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, price, category, image }),
        }
      );

      if (res.ok) {
        Alert.alert("نجاح 🎉", "تم نشر إعلانك بنجاح!");
        setTitle("");
        setPrice("");
        setCategory("");
        setImage("");
      } else {
        Alert.alert("خطأ", "تعذر نشر الإعلان.");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("خطأ", "حدث خطأ أثناء الإرسال.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📝 إضافة إعلان جديد</Text>

      <TextInput
        style={styles.input}
        placeholder="عنوان الإعلان"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="السعر"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="الفئة (مثل: عقارات، سيارات، حيوانات)"
        value={category}
        onChangeText={setCategory}
      />

      {image ? (
        <Image source={{ uri: image }} style={styles.preview} />
      ) : (
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          <Text style={styles.imagePickerText}>📸 اختر صورة</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.button} onPress={submitAd}>
        <Text style={styles.buttonText}>✅ نشر الإعلان</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    textAlign: "right",
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: "#007bff",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginBottom: 12,
  },
  imagePickerText: { color: "#007bff", fontSize: 16 },
  preview: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
