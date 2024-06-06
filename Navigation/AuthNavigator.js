import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import DrawerScreen from "../Drawer/DrawerScreen";
import ROUTES from "../constants/route";
import ForgotScreen from "../pages/ForgotScreen";
import LoginScreen from "../pages/LoginScreen";
import SigninScreen from "./../pages/SigninScreen";

const Stack = createStackNavigator();

function AuthNavigator() {
  console.log(Stack);
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={ROUTES.LOGIN}>
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen}></Stack.Screen>
      <Stack.Screen name={ROUTES.FORGOT} component={ForgotScreen}></Stack.Screen>
      <Stack.Screen name={ROUTES.SIGNIN} component={SigninScreen}></Stack.Screen>
      <Stack.Screen name={ROUTES.DRAWER} component={DrawerScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
