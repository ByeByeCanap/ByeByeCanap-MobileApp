import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Dropdown } from "react-native-element-dropdown";

export default function UserFormsPage3({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [motivation, setMotivation] = useState(null);
  const [value, onChangeText] = useState("");

  const loadFonts = async () => {
    await Font.loadAsync({
      ParkinsansMedium: require("../assets/fonts/ParkinsansMedium.ttf"),
      NotoSansDisplayLight: require("../assets/fonts/NotoSansDisplayLight.ttf"),
      NotoSansDisplayRegular: require("../assets/fonts/NotoSansDisplayRegular.ttf"),
    });
  };

  const motivationOptions = [
    { label: 'Faire des rencontres', value: 'faire_des_rencontres' },
    { label: 'Apprendre de nouvelles choses', value: 'apprendre_nouvelles_choses' },
    { label: 'Passer du bon temps', value: 'passer_du_bon_temps' },
    { label: 'Développer vos compétences', value: 'developper_competences' },
    { label: "Se sentir utile ou s'engager dans une cause", value: 's_engager_dans_une_cause' }
  ];


  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={(err) => console.error(err)}
      />
    );
  }

  const GoNext = () => navigation.navigate("UserFormsScreen4");

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
        <Text style={styles.h1}>Objectifs & Motivations</Text>

        {/* Dropdown 1 */}
        <Text style={styles.h3}>
          Pourquoi voulez-vous participer à des activités ?
        </Text>
        <Dropdown
          style={styles.dropdown}
          data={motivationOptions}
          labelField="label"
          valueField="value"
          placeholder="Choisissez !"
          value={motivation}
          onChange={(item) => setMotivation(item.value)}
        />

        {/* Free text */}
        <Text style={styles.h3}>
          Qu'espérez-vous retirer de ces expériences (plaisir, apprentissage,
          relationnel) ?
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => onChangeText(text)}
          value={value}
          placeholder="Dites-nous en plus !"
        />

        {/* Arrow navigation */}
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
  container: {
    flex: 1,
  },
  content: {
    alignItems: "center",
    padding: 20,
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
  logoIcon: {
    top: 20,
    width: 50,
    height: 50,
  },
  footer: {
    height: 100,
  },
  h1: {
    fontSize: 20,
    fontFamily: "ParkinsansMedium",
    color: "#000",
    marginVertical: 50,
  },
  h3: {
    alignSelf: "stretch",
    fontSize: 18,
    fontFamily: "NotoSansDisplayRegular",
    color: "#000",
    paddingTop: 20,
    paddingBottom: 20,
  },
  dropdown: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#F3773B",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
  },
  textInput: {
    borderWidth: 1,
    width: "100%",
    height: 300,
    borderColor: "#F3773B",
    borderRadius: 15,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
    color: "#282828",
  },
  arrow: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    flexDirection: "column",
    alignItems: "flex-end",
    alignSelf: "stretch",
  },
});
