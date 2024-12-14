import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userType } from "../reducers/users";
import { useSelector } from "react-redux";
import Header from "../components/header";

export default function UserTypeScreen( { navigation } ) {

  const dispatch = useDispatch();

  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Only to check the status of the store ! correct implementation of useType for example and check that the rest is empty
  // A cause du PERSIST store, it is not empty !
  const user = useSelector((state) => state.users.value);
  //console.log("Store BEFORE dispatching", user);

  const particularToSignUp = () =>  {
    dispatch(userType('User'));
   // console.log("Store AFTER dispatching", user);
    navigation.navigate('SignUpScreen')};

    

  const goBack = () => navigation.navigate('SignScreen');

  const loadFonts = async () => {
    await Font.loadAsync({
      ParkinsansMedium: require('../assets/fonts/ParkinsansMedium.ttf'),
      NotoSansDisplayLight: require('../assets/fonts/NotoSansDisplayLight.ttf'),
      NotoSansDisplayRegular: require('../assets/fonts/NotoSansDisplayRegular.ttf'),
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
      <View style={styles.arrow}>
        <FontAwesome name="arrow-left" size={30} onPress={goBack} />
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.button} onPress={particularToSignUp}>
          <Text style={styles.text}>Particulier</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Professionnel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Association</Text>
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