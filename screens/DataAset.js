import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { getToken } from "../constants/authToken";
// import * as SecureToken from 'expo-secure-store';

export default function DataMaster() {
  const [master, setMaster] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const fetchData = async (setMaster) => {
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
      });
      console.log(response.data);
      setMaster(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData(setMaster);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData(setMaster);
    setRefreshing(false);
  };

  const renderUserCard = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.EntityRelations.EntityName}</Text>
        <Text style={styles.email}>{item.AccNo}</Text>
        <Text style={styles.username}>{item.FixedGroup ? item.FixedGroup.Name : "N/A"}</Text>
        <Text style={styles.website}>{item.EntitasBisni ? item.EntitasBisni.EBCode : "N/A"}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={master} keyExtractor={(item) => item.FixedIDNo.toString()} renderItem={renderUserCard} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />} />
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
  username: {
    fontStyle: "italic",
    marginBottom: 5,
  },
  website: {
    color: "blue",
  },
});
