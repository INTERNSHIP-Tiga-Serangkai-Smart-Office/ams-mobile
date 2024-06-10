import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React from "react";
import { Ionicons } from '@expo/vector-icons';

import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import Search from "../assets/search.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Home() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
    <KeyboardAwareScrollView>

      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#ffffff",
            borderRadius: 20,
            padding: 10,
            marginVertical: 20,
            marginHorizontal: 30,
            marginBottom: 20,
            right: 20,
          }}
        >
          <Image
            source={Search}
            style={{ height: 20, width: 20, left: 340, top: 5 }}
          ></Image>
          <TextInput placeholder="Search AIN"></TextInput>
          <View style={{ flexDirection: "row" }}>
          <TouchableOpacity>
            <Octicons 
            name="filter" 
            size={27} color="black"
            style={{left: 310,}} />
          </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            paddingHorizontal: 40,
            paddingVertical: 10,
            marginLeft: 10,
            marginBottom: 400,
            elevation: 10,
            shadowColor: "black",
          }}
        >
          <Text style={{ fontSize: 20, padding: 20 }}></Text>
        </View>

        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            paddingHorizontal: 40,
            paddingVertical: 10,
            marginLeft: 10,
            marginBottom: 400,
            elevation: 10,
            shadowColor: "black",
          }}
        >
          <Text style={{ fontSize: 20, padding: 20 }}></Text>
        </View>

        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            paddingHorizontal: 40,
            paddingVertical: 10,
            marginLeft: 10,
            marginBottom: 400,
            elevation: 10,
            shadowColor: "black",
          }}
        >
          <Text style={{ fontSize: 20, padding: 20 }}></Text>
        </View>

        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            paddingHorizontal: 40,
            paddingVertical: 10,
            marginLeft: 10,
            marginBottom: 400,
            elevation: 10,
            shadowColor: "black",
          }}
        >
          <Text style={{ fontSize: 20, padding: 20 }}></Text>
        </View>

        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            paddingHorizontal: 40,
            paddingVertical: 10,
            marginLeft: 10,
            marginBottom: 400,
            elevation: 10,
            shadowColor: "black",
          }}
        >
          <Text style={{ fontSize: 20, padding: 20 }}></Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("Scan")}
      >
        <Ionicons name="scan-circle" size={80} color={"#000000"}></Ionicons>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a9a9a9",
  },
  floatingButton: {
    flex: 1,
    position: "absolute",
    top: 600,
    right: 30
  },
});