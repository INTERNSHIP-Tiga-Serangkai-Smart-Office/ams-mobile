import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native-web';

const ForgotScreen = () => {
  return (
    <View style={styles.container}>
      <Text>lupa sandi</Text>
    </View>
  )
}

export default ForgotScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
});