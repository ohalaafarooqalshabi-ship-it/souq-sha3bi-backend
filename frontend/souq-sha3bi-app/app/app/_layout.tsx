import React from "react";
import { View, Text, StyleSheet, Linking, TouchableOpacity } from "react-native";
import { OWNER_NAME, OWNER_PHONE } from "./constants/api";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ℹ️ معلومات التطبيق</Text>
      <Text style={styles.text}>هذا التطبيق هو السوق الشعبي الخاص باليمن 🇾🇪</Text>

      <Text style={styles.subtitle}>👨‍💻 المطور والمالك:</Text>
      <Text style={styles.owner}>{OWNER_NAME}</Text>

      <Text style={styles.subtitle}>📞 رقم التواصل:</Text>
      <TouchableOpacity onPress={() => Linking.openURL(`tel:${OWNER_PHONE}`)}>
        <Text style={styles.phone}>{OWNER_PHONE}</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>© جميع الحقوق محفوظة 2025</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  text: { fontSize: 16, textAlign: "center", marginBottom: 30, color: "#333" },
  subtitle: { fontSize: 18, fontWeight: "600", marginTop: 10 },
  owner: { fontSize: 16, color: "#000", marginBottom: 10 },
  phone: { fontSize: 18, color: "#2196F3", fontWeight: "bold", marginBottom: 20 },
  footer: { fontSize: 14, color: "#888", marginTop: 30 },
});
<Tabs.Screen
  name="about"
  options={{
    title: "حول التطبيق",
  }}
/>
<Tabs.Screen
  name="support"
  options={{
    title: "خدمة العملاء",
  }}
/> 
