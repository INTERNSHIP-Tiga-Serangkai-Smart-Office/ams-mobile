import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DataMaster() {
  const [master, setMaster] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/fixed")
      .then((response) => {
        console.log(response.data);
        setMaster(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const renderUserCard = ({item}) => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.EntityRelations.EntityName}</Text>
        <Text style={styles.email}>{item.AccNo}</Text>
        <Text style={styles.username}>{item.FixedGroup ? d.FixedGroup.Name : "N/A"}</Text>
        <Text style={styles.website}>{item.EntitasBisni ? d.EntitasBisni.EBCode : "N/A"}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={master}
        keyExtractor={(item) => item.FixedIDNo.toString()}
        renderItem={renderUserCard}
      ></FlatList>
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
