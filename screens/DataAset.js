import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Search from "../assets/search.png";
import { Octicons } from "@expo/vector-icons";

export default function DataAset() {
  const [master, setMaster] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.137.1:5000/fixed")
      .then((response) => {
        console.log(response.data);
        setMaster(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const renderUserCard = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.EntityRelations.EntityName}</Text>
        <Text style={styles.email}>{item.AccNo}</Text>
        <Text style={styles.username}>
          {item.FixedGroup ? d.FixedGroup.Name : "N/A"}
        </Text>
        <Text style={styles.website}>
          {item.EntitasBisnis ? d.EntitasBisni.EBCode : "N/A"}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* <FlatList
        data={master}
        keyExtractor={(item) => item.FixedIDNo.toString()}
        renderItem={renderUserCard}
      ></FlatList> */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#f0f8ff",
          borderRadius: 20,
          padding: 10,
          marginVertical: 10,
          marginHorizontal: 40,
          marginBottom: 60,
          right: 30,
        }}
      >
        <TouchableOpacity>
          <Image
            source={Search}
            style={{ height: 20, width: 20, left: 300, top: 5 }}
          ></Image>
        </TouchableOpacity>
        <TextInput
          placeholder="Search AIN"
          style={{ fontSize: 17 }}
        ></TextInput>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity>
          <Octicons
            name="filter"
            size={30}
            color="black"
            style={{ left: 380, bottom: 100 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d3d3d3",
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
