import React from "react";
import { useState} from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import Header from "../components/header";

export default function SignScreen( { navigation } ) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const signUp = () => navigation.navigate('UserTypeScreen');
  const signIn = () => navigation.navigate('SignInScreen');

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
      <Header/>
      <View style={styles.btnContainer}>
        <Text style={styles.h2}>Pas encore membre ?</Text>
        <TouchableOpacity style={styles.button} onPress={signUp}>
          <Text style={styles.textBtn}>Sign-Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnContainer}>
        <Text style={styles.h2}>Déjà un compte ?</Text>
        <TouchableOpacity style={styles.button} onPress={signIn}>
          <Text style={styles.textBtn}>Sign-In</Text>
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
    backgroundColor: 'white'
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
  textBtn: {
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
    gap: 20,
    bottom: 45,
  },

  h2 : {
    fontFamily: 'ParkinsansMedium',
    fontSize: 20,
  }
});
