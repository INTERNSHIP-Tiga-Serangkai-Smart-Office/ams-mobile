import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import Search from "../assets/search.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FlatGrid } from "react-native-super-grid";

export default function Home() {
  const navigation = useNavigation();
  const [items] = React.useState([
    { name: "Data Master", code: "#1abc9c" },
    { name: "Data Relokasi", code: "#2ecc71" },
    { name: "Pemasukan", code: "#3498db" },
    { name: "Pengeluaran", code: "#9b59b6" },
    // { name: "WET ASPHALT", code: "#34495e" },
    // { name: "GREEN SEA", code: "#16a085" },
    // { name: "NEPHRITIS", code: "#27ae60" },
    // { name: "BELIZE HOLE", code: "#2980b9" },
    // { name: "WISTERIA", code: "#8e44ad" },
    // { name: "MIDNIGHT BLUE", code: "#2c3e50" },
    // { name: "SUN FLOWER", code: "#f1c40f" },
    // { name: "CARROT", code: "#e67e22" },
    // { name: "ALIZARIN", code: "#e74c3c" },
    // { name: "CLOUDS", code: "#ecf0f1" },
    // { name: "CONCRETE", code: "#95a5a6" },
    // { name: "ORANGE", code: "#f39c12" },
    // { name: "PUMPKIN", code: "#d35400" },
    // { name: "POMEGRANATE", code: "#c0392b" },
    // { name: "SILVER", code: "#bdc3c7" },
    // { name: "ASBESTOS", code: "#7f8c8d" },
  ]);

  return (
    <View style={styles.container}>
      {/* {/* <KeyboardAwareScrollView> */}
      {/* <ScrollView> */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#f0f8ff",
          borderRadius: 20,
          padding: 10,
          marginVertical: 25,
          marginHorizontal: 40,
          marginBottom: 60,
          right: 30,
        }}
      >
        <TouchableOpacity>
          <Image
            source={Search}
            style={{ height: 20, width: 20, left: 320, top: 5 }}
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
            style={{ left: 400, bottom: 100 }}
          />
        </TouchableOpacity>
      </View>
      <FlatGrid
        itemDimension={150}
        data={items}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={5}
        renderItem={({ item }) => (
          <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCode}>{item.code}</Text>
          </View>
        )}
      />
      {/* </ScrollView> */}
      {/* </KeyboardAwareScrollView> */}

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("Scan")}
      >
        <View
          style={{ backgroundColor: "#3cb371", borderRadius: 30, padding: 8 }}
        >
          <AntDesign name="scan1" size={45} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d3d3d3",
  },
  floatingButton: {
    flex: 1,
    position: "absolute",
    top: 580,
    right: 40,
  },
  gridView: {
    marginBottom: 100,
    flex: 1,
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 20,
    height: 140,
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
  },
});
