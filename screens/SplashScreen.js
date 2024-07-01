import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Icon from '../assets/TSPM.png';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Image source={Icon} style={styles.image}></Image>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1e1e1e"
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: "cover",
        
    }
})