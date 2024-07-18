import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View, TextInput,TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getToken } from "../constants/authToken";
import { Octicons } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import Pagination from "../pagination/Pagination";

export default function DataMaster({ navigation }) {
  const [master, setMaster] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const fetchData = async () => {
    try {
      const token = await getToken();
      if (!token) {
        console.log("No token available");
        return;
      }

      const response = await axios.get(`${apiUrl}/fixed`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          _page: currentPage, // Halaman saat ini
          _limit: perPage,    // Jumlah item per halaman
        }
      });
      console.log(response.data);
      setMaster(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Memuat ulang data saat komponen mendapatkan fokus
  useFocusEffect(
    React.useCallback(() => {
      const fetchDataOnFocus = async () => {
        await fetchData();
      };

      fetchDataOnFocus();

      // Cleanup function (optional)  
      return () => {
        // Cleanup logic, if any
      };
    }, [])
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const renderUserCard = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.FixedNo}</Text>
        <Text style={styles.title2}>{item.EntityRelations.EntityName}</Text>
        <Text style={styles.email}>{item.AccNo}</Text>
        <Text style={styles.username}>{item.FixedGroup ? item.FixedGroup.Name : "N/A"}</Text>
        <Text style={styles.website}>{item.EntitasBisni ? item.EntitasBisni.EBCode : "N/A"}</Text>
        <TouchableOpacity style={styles.fab} 
          onPress={() => navigation.navigate('DetailDataAsset', { FixedIDNo: item.FixedIDNo })}>
          <Text style={styles.fabText}>
            <AntDesign name="rightcircle" size={20} color="blue" />
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      return master.slice(0, perPage);
    }
    
    const filteredData = master.filter(item =>
      item.FixedNo.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredData.slice(0, perPage);
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by FixedNo"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Octicons name="search" size={24} color="black" />
      </View>
      <FlatList
        data={handleSearch()}
        keyExtractor={(item) => item.FixedIDNo.toString()}
        renderItem={renderUserCard}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      />
      <Pagination perPage={perPage} setPerPage={setPerPage} fetchData={fetchData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 30,
    paddingHorizontal: 10,
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  title2: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    color: "#666",
    marginBottom: 5,
  },
  username: {
    fontStyle: "italic",
    marginBottom: 5,
  },
  website: {
    color: "blue",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 5,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  fab: {
    alignSelf: 'flex-end',         
    // backgroundColor: '#1E79D5', 
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 30,
    marginTop: 1, // jarak antara button dan data list
  },
});
