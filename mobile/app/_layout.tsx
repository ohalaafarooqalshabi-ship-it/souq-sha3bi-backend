import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* صفحة تسجيل الدخول أول ما يفتح التطبيق */}
      <Stack.Screen name="auth" />

      {/* بعد تسجيل الدخول يفتح التبويبات (الرئيسية، استكشاف، إضافة إعلان) */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
