import React from "react"; "react-native-gesture-handler";
import { View, Text, Image } from "react-native";
import {
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome
} from "@expo/vector-icons";
import {Entypo} from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerItem, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import User from "./assets/user.jpg";
import Scan from "./screens/Scan"
import Home from "./screens/Home";
import Logout from "./screens/Logout";
import Settings from "./screens/Settings";
import DataMaster from "./screens/DataMaster";
import DataRelokasi from "./screens/DataRelokasi";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./pages/LoginScreen";
import { styleProps } from "react-native-web/dist/cjs/modules/forwardedProps";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => {
          return (
            <SafeAreaView>
              <View
                style={{
                  height: 200,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomColor: '#f4f4f4',
                  borderBottomWidth: 1,
                }}>
                <Image
                  source={User}
                  style={{
                    height: 130,
                    width: 130,
                    borderRadius: 65,
                  }}
                />
                <Text
                  style={{
                    fontSize: 22,
                    marginVertical: 6,
                    fontWeight: 'bold',
                    color: '#111',
                  }}>
                  Isabella Joanna
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#111',
                  }}>
                  Product Manager
                </Text>
              </View>
              <DrawerItemList {...props} />
            </SafeAreaView>
          );
        }}
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#fff',
            width: 250,
          },
          headerStyle: {
            backgroundColor: '#ff0000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerLabelStyle: {
            color: '#111',
          },
        }}>
        <Drawer.Screen
          name="Home"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
            drawerIcon: () => (
              <SimpleLineIcons name="home" size={20} color="#808080" />
            ),
          }}
          component={Home}
        />
        <Drawer.Screen
          name="Data Master"
          options={{
            drawerLabel: 'Data Master',
            title: 'Data Master',
            drawerIcon: () => (
              <MaterialIcons
                name="data-exploration"
                size={20}
                color="#808080"
              />
            ),
          }}
          component={DataMaster}
        />
        <Drawer.Screen
          name="Data Relokasi"
          options={{
            drawerLabel: 'Data Relokasi',
            title: 'Data Relokasi',
            drawerIcon: () => (
              <MaterialIcons name="dataset" size={20} color="#808080" />
            ),
          }}
          component={DataRelokasi}
        />

        <Drawer.Screen
          name="Scan"
          options={{
            drawerLabel: 'Scan',
            title: 'Scan',
            drawerIcon: () => (
              <MaterialCommunityIcons
                name="qrcode-scan"
                size={20}
                color="#808080"
              />
            ),
          }}
          component={Scan}
        />

        <Drawer.Screen
          name="Settings"
          options={{
            drawerLabel: 'Settings',
            title: 'Settings',
            drawerIcon: () => (
              <SimpleLineIcons name="settings" size={20} color="#808080" />
            ),
          }}
          component={Settings}
        />

        <Drawer.Screen
          name="Signout"
          options={{
            drawerLabel: 'Signout',
            title: 'Logout',
            drawerIcon: () => (
              <Entypo name="log-out" size={20} color="#ff0000" />
            ),
          }}
          component={Logout}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
