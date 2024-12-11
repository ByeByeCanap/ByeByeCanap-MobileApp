import React, { useState } from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Dropdown } from "react-native-element-dropdown";
import { RadioButton } from "react-native-paper";

const activityOptions = [
  {
    theme: "Activités créatrices",
    categorie: ["Artistique", "Manuel", "Musique"],
  },
  {
    theme: "Sport",
    categorie: [
      "Pratiquer en extérieur (terre)",
      "Pratiquer en extérieur (mer)",
      "Pratiquer en intérieur",
      "Supporter",
    ],
  },
  {
    theme: "Art & Culture",
    categorie: [
      "Cinéma",
      "Concert",
      "Musées",
      "Lecture",
      "Musique (pratiquer)",
    ],
  },
  {
    theme: "Boire & Manger",
    categorie: ["Bars", "Restaurant", "Cuisiner"],
  },
  {
    theme: "Entraide",
    categorie: [
      "Petsitter",
      "Aide à la personne",
      "Services",
      "SOS",
      "Acte citoyen",
    ],
  },
  {
    theme: "Spiritualité",
    categorie: ["Relaxation", "Mysticisme"],
  },
  {
    theme: "Apprentissage",
    categorie: ["Langues", "Musique", "Bricolage"],
  },
  {
    theme: "Plaisir coupable",
    categorie: ["Divertissement", "Jeux", "Rire"],
  },
];

export default function UserFormsPage2( { navigation } ) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [interestTheme, setInterestTheme] = useState(null);
  const [interestCategorie, setInterestCategorie] = useState(null);
  const [skillTheme, setSkillTheme] = useState(null);
  const [skillCategorie, setSkillCategorie] = useState(null);
  const [filteredInterestCategories, setFilteredInterestCategories] = useState([]);
  const [filteredSkillCategories, setFilteredSkillCategories] = useState([]);
  const [checked, setChecked] = useState("");

  const loadFonts = async () => {
    await Font.loadAsync({
      ParkinsansMedium: require("../assets/fonts/ParkinsansMedium.ttf"),
      NotoSansDisplayLight: require("../assets/fonts/NotoSansDisplayLight.ttf"),
      NotoSansDisplayRegular: require("../assets/fonts/NotoSansDisplayRegular.ttf"),
    });
  };

  const handleInterestThemeChange = (selectedInterestTheme) => {
    setInterestTheme(selectedInterestTheme);
    const selectedActivity = activityOptions.find(
      (activity) => activity.theme === selectedInterestTheme
    );
    setFilteredInterestCategories(selectedActivity ? selectedActivity.categorie : []);
    setInterestCategorie(null);
  };

  const handleSkillThemeChange = (selectedSkillTheme) => {
    setSkillTheme(selectedSkillTheme);
    const selectedActivity = activityOptions.find(
      (activity) => activity.theme === selectedSkillTheme
    );
    setFilteredSkillCategories(selectedActivity ? selectedActivity.categorie : []);
    setSkillCategorie(null);
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

  const GoNext = () => { navigation.navigate("UserFormsScreen3")};

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
        <Text style={styles.h1}>Centres d’intérêts</Text>


        {/* Dropdown 1 */}
        <Text style={styles.h3}>
          Qu’est-ce que vous aimez faire pendant votre temps libre ?
        </Text>
        <Dropdown
          style={styles.dropdown}
          data={activityOptions.map((activity) => ({
            label: activity.theme,
            value: activity.theme,
          }))}
          labelField="label"
          valueField="value"
          placeholder="Thèmes"
          value={interestTheme}
          onChange={(item) => handleInterestThemeChange(item.value)}
        />

        <Dropdown
          style={styles.dropdown}
          data={filteredInterestCategories.map((category) => ({
            label: category,
            value: category,
          }))}
          labelField="label"
          valueField="value"
          placeholder="Catégories"
          value={interestCategorie}
          onChange={(item) => setInterestCategorie(item.value)}
        />



        {/* Dropdown 2 */}
        <Text style={styles.h3}>
          Qu’est-ce que vous savez bien faire et aimeriez partager ?
        </Text>
        <Dropdown
          style={styles.dropdown}
          data={activityOptions.map((activity) => ({
            label: activity.theme,
            value: activity.theme,
          }))}
          labelField="label"
          valueField="value"
          placeholder="Thèmes"
          value={skillTheme}
          onChange={(item) => handleSkillThemeChange(item.value)}
        />

        <Dropdown
          style={styles.dropdown}
          data={filteredSkillCategories.map((category) => ({
            label: category,
            value: category,
          }))}
          labelField="label"
          valueField="value"
          placeholder="Catégories"
          value={skillCategorie}
          onChange={(item) => setSkillCategorie(item.value)}
        />


        {/* Radiobutton Gender Choice */}
        <Text style={styles.h3}>
          Êtes-vous intéressé(e) par des activités d'engagement social ou de
          bénévolat ?
        </Text>
        <View style={styles.radioGroup}>
          <RadioButton.Group
            onValueChange={(newValue) => setChecked(newValue)}
            value={checked}
          >
            {["Oui", "Non"].map((value) => (
              <View key={value} style={styles.radioItem}>
                <RadioButton value={value} color="#F3773B" />
                <Text style={styles.radioText}>{value}</Text>
              </View>
            ))}
          </RadioButton.Group>
        </View>

        {/* Arrow navigation */}
        <View style={styles.arrow}>
          <FontAwesome name="arrow-right" size={40} color="black" onPress={GoNext}/>
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
    marginVertical: 50,
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
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
  },
  radioText: {
    fontSize: 16,
    fontFamily: "NotoSansDisplayLight",
    color: "#000",
  },
  arrow: {
    paddingTop: 10,
    paddingRight: 22,
    flexDirection: "column",
    alignItems: "flex-end",
    alignSelf: "stretch",
  },
});
