// screens/Detail.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet,ActivityIndicator,TouchableOpacity } from 'react-native';
import axios from "axios";
import { getToken } from "../constants/authToken";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';

export default function DetailDataAsset({ route,navigation }) {
  const { FixedIDNo } = route.params;

  const [master, setMaster] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  // const handleEditAndNavigate = (master) => {
  //   const FixedIDNo = master?.FixedIDNo;
  //   if (FixedIDNo) {
  //     navigation.navigate("Relokasi", { FixedIDNo });
  //   }
  // };
  
  const fetchData = async (setMaster) => {
    try {
      const token = await getToken();
      if (!token) {
        console.log("No token available");
        return;
      }

      const response = await axios.get(`${apiUrl}/fixed/${FixedIDNo}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setMaster(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const mainData = [
    
    { label: "AIN", name: "FixedNo", value: master?.FixedNo },
    { label: "EntityName", name: "EntityName", value: master?.EntityRelations?.EntityName || "N/A" },
    { label: "AccNo", name: "AccNo", value:master?.AccNo },
    { label: "Currency", name: "Currency", value: master?.Currency },
    { label: "Name FixedGroup", name: "Name FixedGroup", value: master?.FixedGroup?.Name || "N/A" },
    { label: "EBCode", name: "EBCodee", value: master?.EntitasBisni?.EBCode|| "N/A" },
    { label: "LocationName", name: "LocationName", value: master?.Location?.LocationName|| "N/A"},  
  ];


  useEffect(() => {
    fetchData(setMaster);
  }, []);

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
    <ScrollView style={styles.container} >
      <View style={styles.card} >
      {
        mainData.map((item,index) =>(
          <View key={index} style={styles.itemContainer} >
            <Text style={styles.label}>{item.label} :</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        ))
      }
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
    flex: 1, // Flex 1 untuk label
  },
  value: {
    flex: 1, // Flex 1 untuk value
    textAlign: "right", // Value ditampilkan di sebelah kanan
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
    borderWidth: 1,  // Lebar border
    borderColor: "black",  // Warna border
    borderRadius: 8, 
  },
  fab: {
    alignSelf: 'flex-end',
    backgroundColor: '#1E79D5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20, // jarak antara button dan data list
  },
  fabText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});