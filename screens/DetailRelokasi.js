import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import axios from "axios";
import { getToken } from "../constants/authToken";

export default function Detail({ route, navigation }) {
  const { ID } = route.params;

  const [master, setMaster] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const fetchData = async () => {
    try {
      const token = await getToken();
      if (!token) {
        console.log("No token available");
        return;
      }
        
      console.log(`Fetching data from: ${apiUrl}/asset-relocation-item/${ID}`);
      
      const response = await axios.get(`${apiUrl}/asset-relocation-item/${ID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store' // Tambahkan ini jika ingin memastikan cache tidak digunakan
      });
      console.log(response.data);

      if (response.data.data && response.data.data.length > 0) {
        setMaster(response.data.data[0]);
      } else {
        setMaster(null);
      }
      
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Listener untuk menangkap focus event
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData(); // Panggil fetchData ketika layar mendapatkan fokus
    });

    return unsubscribe;
  }, [navigation]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const mainData = [
    { label: "TransNo", name: "TransNo", value: master?.AssetRelocation?.TransNo },
    { label: "Fixed Asset Name", name: "FixedAssetName", value: master?.Fixed?.FixedAssetName },
    { label: "Fixed No", name: "FixedNo", value: master?.Fixed?.FixedNo },
    { label: "TransDate", name: "RelocationDate", value: formatDate(master?.RelocationDate) },
    { label: "Pengguna Awal", name: "PreviousEmployeeResponsible", value: master?.PreviousEmployeeResponsible || "N/A" },
    { label: "Pengguna Terbaru", name: "NewEmployeeResponsible", value: master?.NewEmployeeResponsible || "N/A" },
    { label: "Tempat Awal", name: "PreviousLocationDetails", value: master?.Fixed?.Location?.LocationName },
    { label: "Tempat Terbaru", name: "NewLocationDetails", value: master?.Fixed?.Location?.LocationName },
  ];

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!master) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Data not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        {mainData.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={styles.label}>{item.label} :</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:  "#F0F0F065",
    padding: 5,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    marginRight: 10,
    flex: 1,
  },
  value: {
    flex: 1,
    textAlign: "right",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
  },
});
