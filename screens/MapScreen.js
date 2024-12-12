import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Material = MaterialCommunityIcons;

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
      setCurrentPosition(location.coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#fdc731", "#f3773b"]}
        style={styles.header}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
      >
        <View style={styles.LeftSide}>
          <Image
            style={styles.LeftIcon}
            resizeMode="cover"
            source={require("../assets/logoIcon.png")}
          />
          <Material name="bell-outline" size={30} />
        </View>
        <View style={styles.RightSide}>
          <FontAwesome name="search" size={30} />
        </View>
      </LinearGradient>
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
      <LinearGradient
        colors={["#fdc731", "#f3773b"]}
        style={styles.footer}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={styles.footerBar}>
          <FontAwesome name="home" size={30} marginLeft={10} />
          <FontAwesome name="map-marker" size={30} />
          <FontAwesome name="user-circle" size={30} marginRight={10} />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderWidth: 1,
    height: 130,
    flexDirection: "row",
  },
  LeftSide: {
    width: "50%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  LeftIcon: {
    width: 50,
    height: 50,
    marginLeft: 10,
    marginRight: 20,
  },
  RightSide: {
    width: "50%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 15,
  },
  ScreenContent: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  footer: {
    height: 60,
    borderWidth: 1,
  },
  footerBar: {
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
