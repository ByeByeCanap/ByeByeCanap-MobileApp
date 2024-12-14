import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { useState } from "react";

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

export default function SearchEventScreen({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

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

  const catalogue = activityOptions.map((data, index) => {
    return (
      <View key={index} style={styles.catalogueItem}>
        <View style={styles.bannerTheme}>
          <Text style={styles.textTheme}>{data.theme}</Text>
        </View>

        <ScrollView horizontal={true} style={styles.themeContainer}>
          {data.categorie.map((category, categoryIndex) => (
            <View key={categoryIndex} style={styles.categorie}>
              <Text>{category}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  });

  const goSolutionScreen = () => {
    navigation.navigate("SolutionScreen");
  };

  const goBack = () => {
    navigation.navigate("TabNavigator");
  };

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
        <FontAwesome name="arrow-left" size={30} onPress={goBack} />
        <Text style={styles.h1}>Chercher un événement</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.mainEvent}>
          {/* <ImageBackground source={'./assets/imagesEvent/event_1.jpg'}/> */}
          <TouchableOpacity style={styles.btnJoin}>
            <Text style={styles.textJoin}>Participer</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>{catalogue}</ScrollView>

        {/* J'ai pas trouvé --> redirection vers SolutionScreen */}
        <TouchableOpacity
          style={styles.buttonSolution}
          onPress={goSolutionScreen}
        >
          <Text style={styles.text}>J'ai pas trouvé...</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "white",
  },

  content: {
    alignItems: "center",
    justifyContent: "stretch",
    paddingVertical: 10,
  },

  arrow: {
    paddingRight: 10,
    paddingLeft: 22,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 20,
    paddingTop: 20,
    paddingBottom: 20,
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

  buttonSolution: {
    backgroundColor: "#F3773B",
    padding: 10,
    borderRadius: 19,
    marginVertical: 10,
    alignItems: "center",
    width: 250,
    height: 50,
    marginVertical: 20,
  },

  text: {
    color: "white",
    fontFamily: "ParkinsansMedium",
    fontSize: 20,
  },

  logoIcon: {
    top: 20,
    width: 50,
    height: 50,
  },

  textJoin: {
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: 28,
    fontFamily: "NotoSansDisplayRegular",
    color: "#fff",
    textAlign: "center",
  },

  btnJoin: {
    borderRadius: 20,
    backgroundColor: "#fdc731",
    width: 120,
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 0,
  },

  mainEvent: {
    borderRadius: 15,
    flex: 1,
    width: 320,
    height: 234,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingHorizontal: 9,
    paddingVertical: 22,
    backgroundColor: "grey",
  },

  textTheme: {
    fontSize: 18,
    letterSpacing: 0,
    lineHeight: 28,
    fontFamily: "NotoSansDisplayRegular",
    color: "#fff",
    textAlign: "left",
  },

  bannerTheme: {
    borderRadius: 19,
    backgroundColor: "#fdc731",
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 22,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    marginVertical: 20,
    marginHorizontal: 20,
  },

  categorie: {
    width: 120,
    height: 120,
    backgroundColor: "yellow",
    marginHorizontal: 10,
  },

  themeContainer: {
    gap: 10,
  },
});
