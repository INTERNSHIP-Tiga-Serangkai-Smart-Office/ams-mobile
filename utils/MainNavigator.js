import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/LoginScreen";
import { useLogin } from "../context/LoginProvider";
import App from "../App";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerNavigator  from "../App";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const StackNavigator = () => {
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen component={Login} name="Login"></Stack.Screen>
        </Stack.Navigator> 
    )
};

const MainNavigator = () => {
    const {isLoggedIn} = useLogin()
    return isLoggedIn ? <Drawer.Navigator/> : <StackNavigator/>;
};

export default MainNavigator;