import React from 'react';
import {
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  Entypo,
} from '@expo/vector-icons';
import {View, Text} from 'react-native';
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image} from 'expo-image';

import Home from '../screens/Home';
import DataMaster from '../screens/DataMaster';
import DataRelokasi from '../screens/DataRelokasi';
import Logout from '../screens/Logout';
import Scan from '../screens/Scan';
import Settings from '../screens/Settings';
import User from '../assets/user.jpg';

const Drawer = createDrawerNavigator();

const DrawerScreen = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => (
        <SafeAreaView>
          <View
            style={{
              height: 220,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomColor: '#f4f4f4',
              borderBottomWidth: 1,
            }}>
            <Image
              source={User}
              style={{
                height: 120,
                width: 120,
                borderRadius: 65,
              }}
            />
            <Text
              style={{
                fontSize: 22,
                marginVertical: 5,
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
              Superadmin
            </Text>
          </View>
          <DrawerItemList {...props} />
        </SafeAreaView>
      )}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#ffff',
          width: 230,
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
            <MaterialIcons name="data-exploration" size={20} color="#808080" />
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
          title: 'Signout',
          drawerIcon: () => <Entypo name="log-out" size={20} color="#ff0000" />,
        }}
        component={Logout}
      />
    </Drawer.Navigator>
  );
};

export default DrawerScreen;
