import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Header from "../components/header";

export default function HomeScreen() {
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      console.log(location);

      setCurrentPosition(location.coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.ScreenContent}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: currentPosition ? currentPosition.latitude : 37.78825,
            longitude: currentPosition ? currentPosition.longitude : -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        ></MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ScreenContent: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
