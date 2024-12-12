import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useState } from "react";

export default function SolutionScreen( { navigation } ) {

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [eventTitle, setEventTitle] = useState('');

  // const goBack = () => navigation.navigate('SolutionPage');
  // const publishEvent = () => navigation.naviagte('HomePage'); ?? On navigue vers quelle page une fois le formulaire complété ?
  // ajouter TabNavigation

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
      <LinearGradient
        style={styles.header}
        colors={["#fdc731", "#f3773b"]}
        useAngle={true}
        angle={135}
        start={{ x: 0, y: 1 }}
      >
        <Image
          style={styles.logoIcon}
          resizeMode="cover"
          source={require("../assets/logoIcon.png")}
        />
      </LinearGradient>

      <View style={styles.arrow}>
        <FontAwesome name="arrow-left" size={30}/>
        <Text style={styles.h1}>Proposer un événement</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
      <TextInput
          style={styles.input}
          value={eventTitle}
          onChangeText={setEventTitle}
          placeholder="Nom de l'événement"
          placeholderTextColor="#A9A9A9"
        />

      <Image source={require("../assets/avatars/Avatar_1.png")} style={styles.image}></Image>

      <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Définir une image d'événement</Text>
      </TouchableOpacity>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  arrow: {
    paddingRight: 10,
    paddingLeft: 22,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: 'flex-start',
    gap : 20,
    paddingTop : 20,
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

  h1: {
    fontSize: 20,
    fontFamily: "ParkinsansMedium",
    color: "#000",
  },

  content: {
    alignItems: "center",
    paddingHorizontal : 40, 
    paddingVertical: 30,
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
    color: 'white',
    fontFamily: 'ParkinsansMedium',
    fontSize: 20,
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

  input: {
    width: "130%",
    height: 50,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#F3773B",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    color: "#282828",
    fontFamily: 'ParkinsansMedium',
    fontSize: 20,
    marginBottom : 20,
  },

  image: {
    width : 10,
    height : 10,
  }
});
