import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function AdDetails() {
  const { id, title, price, category, image } = useLocalSearchParams();
  const router = useRouter();

  const [isFavorite, setIsFavorite] = useState(false);

  const phone = "967777777777"; // 📱 ضع رقمك هنا
  const email = "example@mail.com"; // 📧 ضع بريدك هنا
  const mapLocation = "15.3694,44.1910"; // 📍 صنعاء كمثال (lat,long)

  // ✅ واتساب
  const openWhatsApp = () => {
    const message = `مرحباً، أنا مهتم بالإعلان: ${title} (${price} ريال)`;
    Linking.openURL(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
  };

  // ✅ اتصال مباشر
  const openCall = () => {
    Linking.openURL(`tel:${phone}`);
  };

  // ✅ SMS
  const openSMS = () => {
    Linking.openURL(`sms:${phone}?body=مرحباً، مهتم بالإعلان: ${title}`);
  };

  // ✅ Email
  const openEmail = () => {
    Linking.openURL(`mailto:${email}?subject=استفسار عن إعلان ${title}&body=السلام عليكم،`);
  };

  // ✅ خريطة
  const openMap = () => {
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${mapLocation}`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* صور الإعلان */}
      <Image
        source={{ uri: (image as string) || "https://via.placeholder.com/400" }}
        style={styles.image}
      />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.meta}>
        {category} • <Text style={styles.price}>{price} ريال</Text>
      </Text>
      <Text style={styles.time}>🕒 منذ 3 ساعات</Text>
      <Text style={styles.owner}>👤 المعلن: مستخدم موثوق</Text>

      {/* وصف */}
      <Text style={styles.description}>
        ✨ إعلان مميز يحتوي على جميع التفاصيل. يمكنك التواصل مباشرة مع المعلن عبر
        الطرق المختلفة أدناه.
      </Text>

      {/* أزرار التواصل */}
      <TouchableOpacity style={[styles.btn, { backgroundColor: "#25D366" }]} onPress={openWhatsApp}>
        <Text style={styles.btnText}>📲 تواصل عبر واتساب</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btn, { backgroundColor: "#007BFF" }]} onPress={openCall}>
        <Text style={styles.btnText}>📞 اتصال مباشر</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btn, { backgroundColor: "#FF9800" }]} onPress={openSMS}>
        <Text style={styles.btnText}>✉️ أرسل SMS</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btn, { backgroundColor: "#d32f2f" }]} onPress={openEmail}>
        <Text style={styles.btnText}>📧 أرسل بريد</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btn, { backgroundColor: "#4CAF50" }]} onPress={openMap}>
        <Text style={styles.btnText}>📍 عرض الموقع</Text>
      </TouchableOpacity>

      {/* زر المفضلة */}
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: isFavorite ? "#FFC107" : "#9C27B0" }]}
        onPress={() => {
          setIsFavorite(!isFavorite);
          Alert.alert(
            "المفضلة",
            isFavorite ? "تمت إزالة الإعلان من المفضلة" : "تمت إضافة الإعلان إلى المفضلة"
          );
        }}
      >
        <Text style={styles.btnText}>
          {isFavorite ? "⭐ إزالة من المفضلة" : "⭐ أضف إلى المفضلة"}
        </Text>
      </TouchableOpacity>

      {/* زر رجوع */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>⬅ رجوع</Text>
      </TouchableOpacity>

      {/* تحذير */}
      <Text style={styles.warning}>
        ⚠️ تحذير: تحقق دائماً من البائع قبل إرسال أي مبالغ مالية.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6,
  },
  meta: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  price: {
    color: "#d32f2f",
    fontWeight: "bold",
  },
  time: {
    fontSize: 14,
    color: "#777",
    marginBottom: 4,
  },
  owner: {
    fontSize: 15,
    marginBottom: 12,
    fontWeight: "500",
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
    color: "#333",
  },
  btn: {
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backBtn: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    color: "#007BFF",
  },
  warning: {
    fontSize: 13,
    color: "#d32f2f",
    marginTop: 10,
    textAlign: "center",
  },
});
