import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View, TextInput,TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getToken } from "../constants/authToken";
import { Octicons } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function DataRelokasi({ navigation }) {
  const [master, setMaster] = useState([]);
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

      const response = await axios.get(`${apiUrl}/asset-relocation`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
        <Text style={styles.title}>{item.TransNo}</Text>
        <Text style={styles.title2}>{item.TransDesc}</Text>
        <Text style={styles.email}>{item.TransDate}</Text>
        {/* <Text style={styles.username}>{item.FixedGroup ? item.FixedGroup.Name : "N/A"}</Text> */}
        <Text style={styles.website}>{ item.EntitasBisni.EBCode }</Text>
        <TouchableOpacity style={styles.fab} 
          onPress={() => navigation.navigate('DetailRelokasi', { ID: item.ID })}>
          <Text style={styles.fabText}>
            <AntDesign name="rightcircle" size={20} color="blue" />
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      return master;
    }
    
    const filteredData = master.filter(item =>
      item.TransNo.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredData;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Octicons name="search" size={24} color="black" />
      </View>
      <FlatList
        data={handleSearch()}
        keyExtractor={(item) => item.ID.toString()}
        renderItem={renderUserCard}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      />
      
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
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    color: "#666",
    marginBottom: 5,
  },
  title2: {
    fontSize: 14,
    fontWeight: "bold",
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
    marginTop: 10, // jarak antara button dan data list
  },
});
