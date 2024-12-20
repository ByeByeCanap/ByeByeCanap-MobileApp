import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { useState } from "react";
import Header from "../components/header";

export default function SolutionScreen({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // const goBack = () => navigation.navigate('SearchEventScreen');
  // const goToCreateEventPage = () => navigation.naviagte('CreateEventPage');
  // ajouter TabNavigation

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

  const goCreateEventScreen = () => {
    navigation.navigate("CreateEventScreen");
  };

  const goBack = () => {
    navigation.navigate("SearchEventScreen");
  };

  const goHome = () => {
    navigation.navigate("TabNavigator");
  };

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.arrow}>
        <FontAwesome name="arrow-left" size={30} onPress={goBack} />
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.button} onPress={goCreateEventScreen}>
          <Text style={styles.text}>Proposer un événement</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Recevoir une alerte</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={goHome}>
          <Text style={styles.text}>Revenir plus tard</Text>
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
    width: "100%",
    backgroundColor: "#F3773B",
    paddingTop: 10,
    borderRadius: 19,
    paddingHorizontal: 15,
    marginVertical: 10,
    alignItems: "center",
    height: 50,
  },
  text: {
    color: "white",
    fontFamily: "ParkinsansMedium",
    fontSize: 20,
  },
  arrow: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 22,
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "stretch",
  },

  footer: {
    height: 100,
    alignSelf: "stretch",
  },

  logoIcon: {
    top: 20,
    width: 50,
    height: 50,
  },

  btnContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 274,
    gap: 50,
    bottom: 40,
  },
});
