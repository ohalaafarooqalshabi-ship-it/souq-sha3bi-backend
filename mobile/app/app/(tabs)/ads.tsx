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
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";

export default function AdsScreen() {
  const router = useRouter();

  const [ads, setAds] = useState<any[]>([]);
  const [filteredAds, setFilteredAds] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [refreshing, setRefreshing] = useState(false);

  // 🔹 جلب البيانات من API
  const fetchAds = () => {
    setRefreshing(true);
    fetch("http://192.168.1.100:5000/api/ads") // ← غيّر الـ IP حسب سيرفرك
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

  // 🔹 فلترة + بحث + فرز
  useEffect(() => {
    let results = [...ads];

    if (search.trim() !== "") {
      results = results.filter((ad) =>
        ad.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "all") {
      results = results.filter((ad) => ad.category === category);
    }

    if (sort === "newest") {
      results = results.sort((a, b) => b.id - a.id);
    } else if (sort === "oldest") {
      results = results.sort((a, b) => a.id - b.id);
    } else if (sort === "priceHigh") {
      results = results.sort((a, b) => b.price - a.price);
    } else if (sort === "priceLow") {
      results = results.sort((a, b) => a.price - b.price);
    }

    setFilteredAds(results);
  }, [search, category, sort, ads]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📢 الإعلانات</Text>

      {/* 🔎 مربع البحث */}
      <TextInput
        style={styles.search}
        placeholder="ابحث عن إعلان..."
        value={search}
        onChangeText={setSearch}
      />

      {/* 🔹 اختيار الفئة */}
      <Picker selectedValue={category} onValueChange={setCategory} style={styles.picker}>
        <Picker.Item label="كل الفئات" value="all" />
        <Picker.Item label="جوالات" value="جوالات" />
        <Picker.Item label="الكترونيات" value="الكترونيات" />
        <Picker.Item label="سيارات" value="سيارات" />
        <Picker.Item label="عقارات" value="عقارات" />
        <Picker.Item label="أراضي" value="أراضي" />
        <Picker.Item label="حيوانات" value="حيوانات" />
      </Picker>

      {/* 🔹 اختيار الفرز */}
      <Picker selectedValue={sort} onValueChange={setSort} style={styles.picker}>
        <Picker.Item label="الأحدث" value="newest" />
        <Picker.Item label="الأقدم" value="oldest" />
        <Picker.Item label="السعر الأعلى" value="priceHigh" />
        <Picker.Item label="السعر الأقل" value="priceLow" />
      </Picker>

      {/* 📋 قائمة الإعلانات */}
      <FlatList
        data={filteredAds}
        keyExtractor={(item) => item.id.toString()}
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
                  id: item.id,
                  title: item.title,
                  price: item.price,
                  category: item.category,
                  image: item.image,
                },
              })
            }
          >
            <Image
              source={{ uri: item.image || "https://via.placeholder.com/150" }}
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
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    textAlign: "right",
  },
  picker: { marginBottom: 10 },
  card: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 10 },
  info: { flex: 1, justifyContent: "center" },
  title: { fontSize: 16, fontWeight: "bold" },
  meta: { fontSize: 14, color: "#666" },
});
