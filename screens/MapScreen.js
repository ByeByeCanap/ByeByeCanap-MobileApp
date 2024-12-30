import Header from "../components/header";

import MapView from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BACK_IP } from "../env";
export default function MapScreen() {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [LocationCoord, setLocationCoord] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await Location.requestForegroundPermissionsAsync();
      const status = result.status;

      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          setCurrentPosition(location.coords);
        });
      }
    })();

    fetch(`${BACK_IP}/events/allEvents`)
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.result.length; i++) {
          console.log("data", data.result[i].location);
        }
        setLocationCoord(data.result);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.ScreenContent}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: currentPosition ? currentPosition.latitude : 43.24,
            longitude: currentPosition ? currentPosition.longitude : 5.36,
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
