import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ROUTES from "../constants/route";
import ForgotScreen from "../pages/ForgotScreen";
import LoginScreen from "../pages/LoginScreen";
import SigninScreen from './../pages/SigninScreen';
import Drawer from '../Drawer/DrawerScreen';
import Scan from '../screens/Scan';
import Detail from "../screens/Detail";
import Relokasi from "../screens/Relokasi";
import DetailRelokasi from "../screens/DetailRelokasi";
const Stack = createStackNavigator();

function AuthNavigator () {
    console.log(Stack);
    return(
        <Stack.Navigator initialRouteName={ROUTES.LOGIN} screenOptions={{headerShown: false}}>
            <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen}></Stack.Screen>
            <Stack.Screen name={ROUTES.FORGOT} component={ForgotScreen}></Stack.Screen>
            <Stack.Screen name={ROUTES.SIGNIN} component={SigninScreen}></Stack.Screen>
            <Stack.Screen name={ROUTES.DRAWER} component={Drawer} options={{ headerShown: false }} />
            <Stack.Screen name="Scan" component={Scan} options={{ headerShown: true }} />
            <Stack.Screen name="Detail" component={Detail} options={{ headerShown: true }} />
            <Stack.Screen name="Relokasi" component={Relokasi} options={{ headerShown: true }} />
            <Stack.Screen name="DetailRelokasi" component={DetailRelokasi} options={{ headerShown: true }} />
        </Stack.Navigator>
    );
  };

export default AuthNavigator;
