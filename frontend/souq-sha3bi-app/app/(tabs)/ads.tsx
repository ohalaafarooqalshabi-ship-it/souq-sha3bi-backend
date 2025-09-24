import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";

export default function AdsScreen() {
  const router = useRouter();

  const [ads, setAds] = useState<any[]>([]);
  const [filteredAds, setFilteredAds] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  // 🔹 جلب الإعلانات من الـ Backend
  const fetchAds = () => {
    setRefreshing(true);
    fetch("https://souq-sha3bi-backend-2.onrender.com/api/ads")
      .then((res) => res.json())
      .then((data) => {
        setAds(data);
        setFilteredAds(data);
        setRefreshing(false);
      })
      .catch((err) => {
        console.error("خطأ في جلب البيانات:", err);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchAds();
  }, []);

  // 🔹 البحث
  useEffect(() => {
    let results = [...ads];

    if (search.trim() !== "") {
      results = results.filter((ad) =>
        ad.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredAds(results);
  }, [search, ads]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📢 جميع الإعلانات</Text>

      {/* 🔎 مربع البحث */}
      <TextInput
        style={styles.search}
        placeholder="ابحث عن إعلان..."
        value={search}
        onChangeText={setSearch}
      />

      {/* 📋 قائمة الإعلانات */}
      <FlatList
        data={filteredAds}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchAds} />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/adDetails",
                params: {
                  id: item._id,
                  title: item.title,
                  price: item.price,
                  category: item.category,
                  image: item.image,
                },
              })
            }
          >
            <Image
              source={{
                uri: item.image || "https://via.placeholder.com/150",
              }}
              style={styles.image}
            />
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.meta}>
                {item.category} • {item.price} ريال
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: "#fff" },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    textAlign: "right",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  image: { width: 80, height: 80, borderRadius: 8, marginRight:
