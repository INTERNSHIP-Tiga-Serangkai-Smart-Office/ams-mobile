import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Linking } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function Scan() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(()=>{
    (async ()=>{
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    }) ();
  }, []);

  const handleBarCodeSanned =({type,data})=>{
    setScanned(true);
    alert(`Bar Code With Type ${type} and data ${Linking.openURL(`${data}`)} has beeen scanned`);
  };

  if (hasPermission === null){
    return <Text>Requesting for Camera Permission</Text>
  }
  if(hasPermission === false){
    return <Text>N Acces to Camera</Text>
  }

  return (
    // <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    //   <Text>Scanbarcodes</Text>
    // </View>
    <View style={styles.container}>
      <BarCodeScanner 
      onBarCodeScanned={scanned ? undefined : handleBarCodeSanned}
      style = {StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title='Tap To Scan Again' onPress={()=>setScanned(false)}/>}
    </View>
  );
}

const styles = StyleSheet.create ({
  container:{
    flex:1,
    flexDirection:'column',
    justifyContent:'center'
  }
})
