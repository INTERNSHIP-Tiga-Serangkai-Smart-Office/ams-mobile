import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
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
        </ScrollView>
      </KeyboardAwareScrollView>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: "#fff5ee",
            borderRadius: 20,
            paddingHorizontal: 40,
            paddingVertical: 10,
            marginLeft: 20,
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
});
