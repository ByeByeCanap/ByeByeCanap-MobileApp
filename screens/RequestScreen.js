import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import Header from "../components/header";
import { useState } from "react";

export default function RequestScreen({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const GoHome = () => navigation.navigate("TabNavigator");

  const loadFonts = async () => {
    await Font.loadAsync({
      ParkinsansMedium: require("../assets/fonts/ParkinsansMedium.ttf"),
      NotoSansDisplayLight: require("../assets/fonts/NotoSansDisplayLight.ttf"),
      NotoSansDisplayRegular: require("../assets/fonts/NotoSansDisplayRegular.ttf"),
    });
  };

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={(err) => console.error(err)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.Container}>
        <Text style={styles.h1}>
          Votre demande de participation à été envoyée à l’organisateur !
        </Text>

        <TouchableOpacity style={styles.button} onPress={GoHome}>
          <Text style={styles.text}>Revenir au Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  header: {
    width: "100%",
    height: 120,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 22,
    backgroundColor: "transparent",
  },

  button: {
    backgroundColor: "#F3773B",
    padding: 10,
    borderRadius: 19,
    marginVertical: 10,
    alignItems: "center",
    width: 227,
    height: 50,
  },
  text: {
    color: "white",
    fontFamily: "ParkinsansMedium",
    fontSize: 20,
  },
  arrow: {
    paddingTop: 20,
    paddingRight: 10,
    paddingLeft: 22,
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "stretch",
  },

  logoIcon: {
    top: 20,
    width: 50,
    height: 50,
  },

  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 274,
    gap: 50,
    bottom: 40,
  },

  h1: {
    paddingHorizontal: 20,
    fontSize: 22,
    fontFamily: "ParkinsansMedium",
    textAlign: "center",
    color: "#000",
  },
});
