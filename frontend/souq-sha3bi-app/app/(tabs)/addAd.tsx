import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function AddAd() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<string | null>(null);

  // اختيار صورة من الجهاز
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // حفظ الإعلان (لاحقاً نربطه مع السيرفر)
  const handleSaveAd = () => {
    if (!title || !price || !category) {
      Alert.alert("خطأ", "الرجاء إدخال جميع الحقول المطلوبة");
      return;
    }
    Alert.alert("تم الحفظ ✅", "سيتم رفع الإعلان قريباً إلى قاعدة البيانات.");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>عنوان الإعلان</Text>
      <TextInput
        style={styles.input}
        placeholder="مثال: للبيع تلفون سامسونج"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>الوصف</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="اكتب تفاصيل الإعلان..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>السعر</Text>
      <TextInput
        style={styles.input}
        placeholder="ادخل السعر"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Text style={styles.label}>التصنيف</Text>
      <TextInput
        style={styles.input}
        placeholder="مثال: إلكترونيات، عقارات، ملابس"
        value={category}
        onChangeText={setCategory}
      />

      <Text style={styles.label}>صورة الإعلان</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.imagePickerText}>📷 اختر صورة</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.preview} />}

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveAd}>
        <Text style={styles.saveText}>حفظ الإعلان</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 5, marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  imagePicker: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  imagePickerText: { fontSize: 16, color: "#007bff", fontWeight: "bold" },
  preview: { width: "100%", height: 200, borderRadius: 10, marginBottom: 15 },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  saveText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
