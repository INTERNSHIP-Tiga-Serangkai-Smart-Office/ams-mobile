import { Camera, CameraView } from "expo-camera";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, Linking,Alert } from "react-native";

export default function App({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({  data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    Alert.alert(`Hasil Data Scan`,`Barcode dengan No.AIN : ${data}\n Berhasil di scan`,[
      {
        text:'Cancel',
        onPress : () => console.log('cancel pressed'),
        style: 'cancel'
      },
      {
        text:'Detail',
        onPress: () => navigation.navigate('Detail', { data }),
      }
    ] );
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        // barcodeScannerSettings={{
        //   barcodeTypes: ["qr", "pdf417"],
        // }}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
