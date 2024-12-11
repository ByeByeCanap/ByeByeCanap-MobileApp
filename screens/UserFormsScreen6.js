import React, { useState } from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Dropdown } from "react-native-element-dropdown";
import { RadioButton } from "react-native-paper";

const preferencesOptions = [
  { label: 'Centré sur les mêmes passions', value: 'memes_passions' },
  { label: 'Ouvert à la découverte', value: 'decouverte' },
];

const valuesOptions = [
  { label: 'Bienveillance', value: 'bienveillance' },
  { label: 'Authenticité', value: 'authenticite' },
  { label: 'Solidarité', value: 'solidarite' },
  { label: 'Créativité', value: 'creativite' }
];

const projectOptions= [
  { label: 'Écologie', value: 'ecologie' },
  { label: 'Aide sociale', value: 'aide_sociale' },
];



export default function UserFormsPage6({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [preferences, setPreferences] = useState(null);
  const [values, setValues] = useState([]);

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

  const GoNext = () => navigation.navigate("UserFormsScreen7");

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.header}
        colors={["#fdc731", "#f3773b"]}
        start={{ x: 0, y: 1 }}
      >
        <Image
          style={styles.logoIcon}
          resizeMode="cover"
          source={require("../assets/logoIcon.png")}
        />
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.h1}>Disponibilités et Logistique</Text>

        <Text style={styles.h3}>
          Avec quel type de personnes souhaitez-vous partager une activité ?
        </Text>
        <Dropdown
          style={styles.dropdown}
          data={preferencesOptions}
          labelField="label"
          valueField="value"
          placeholder="Choisissez !"
          value={preferences}
          onChange={(item) => setPreferences(item.value)}
        />

        <Text style={styles.h3}>Quelles sont vos valeurs ?</Text>
        <Dropdown
          style={styles.dropdown}
          data={valuesOptions}
          labelField="label"
          valueField="value"
          placeholder="Choisissez !"
          value={values}
          onChange={(item) => setValues(item.value)}
        />

        <Text style={styles.h3}>
          Quelles causes ou projets vous tiennent à cœur ? 
        </Text>
        <Dropdown
          style={styles.dropdown}
          data={projectOptions}
          labelField="label"
          valueField="value"
          placeholder="Choisissez !"
          value={values}
          onChange={(item) => setValues(item.value)}
        />


        {/* Arrow Navigation */}
        <View style={styles.arrow}>
          <FontAwesome
            name="arrow-right"
            size={40}
            color="black"
            onPress={GoNext}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { alignItems: "center", padding: 20 },
  header: {
    width: "100%",
    height: 120,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 22,
  },
  logoIcon: { top: 20, width: 50, height: 50 },
  footer: { height: 100 },
  h1: {
    fontSize: 20,
    fontFamily: "ParkinsansMedium",
    color: "#000",
    marginVertical: 20,
  },
  h3: {
    alignSelf: "stretch",
    fontSize: 18,
    fontFamily: "NotoSansDisplayRegular",
    color: "#000",
    paddingTop: 30,
  },
  dropdown: {
    width: "100%",
    height: 50,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#F3773B",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    marginVertical: 10,
    fontFamily: "NotoSansDisplayLight",
    fontSize: 16,
    color: "#282828",
  },
  arrow: {
    paddingTop: 10,
    paddingRight: 22,
    flexDirection: "column",
    alignItems: "flex-end",
    alignSelf: "stretch",
  },
});
