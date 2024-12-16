import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { useState } from "react";
import { Header } from "../components/header"

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
      <View key={index}>
        <View style={styles.bannerTheme}>
          <Text style={styles.textTheme}>{data.theme}</Text>
        </View>

        <ScrollView horizontal={true} style={styles.themeContainer}>
          {data.categorie.map((category, categoryIndex) => {
            const imageSource = [
              require(`../assets/imagesEvent/theme_0.jpg`),
              require(`../assets/imagesEvent/theme_1.jpg`),
              require(`../assets/imagesEvent/theme_2.jpg`),
              require(`../assets/imagesEvent/theme_3.jpg`),
              require(`../assets/imagesEvent/theme_4.jpg`),
              require(`../assets/imagesEvent/theme_5.jpg`),
              require(`../assets/imagesEvent/theme_6.jpg`),
              require(`../assets/imagesEvent/theme_7.jpg`),
            ];
            return (
            <View style={styles.justify}>
            <ImageBackground
              key={categoryIndex}
              source={imageSource[index]}
              style={styles.categorie}
              >
            </ImageBackground>
            <Text style={styles.textDescription}>{category}</Text>
            
            </View>
        )})}
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

  const goRequestScreen = () => {
    navigation.navigate('RequestScreen')
  }
  const goDetailScreen = () => {
    navigation.navigate('SearchScreen')
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
        <FontAwesome name="arrow-left" size={30} onPress={goBack} />
        <Text style={styles.h1}>Chercher un événement</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={{ width: '100%', alignItems: 'center' }} onPress={goDetailScreen}>
        <ImageBackground
          source={require('../assets/imagesEvent/event_main.jpg')}
          style={styles.mainEvent}
          imageStyle={{ borderRadius: 15 }}
          >
         
        </ImageBackground>
        </Pressable>

        <Text>Infos sur l'événement</Text>
        

        <TouchableOpacity style={styles.buttonParticiper}  onPress={goRequestScreen}> 
            <Text style={styles.text}>Participer</Text>
          </TouchableOpacity>
        

        <ScrollView>{catalogue}</ScrollView>

        <TouchableOpacity
          style={styles.button}
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
    backgroundColor: "white",
  },

  content: {
    alignItems: "center",
    justifyContent: "stretch",
    paddingVertical: 20,
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

  button: {
    backgroundColor: "#F3773B",
    padding: 10,
    borderRadius: 19,
    marginVertical: 10,
    alignItems: "center",
    width: 250,
    height: 50,
    marginVertical: 50,
  },

  buttonParticiper: {
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

  mainEvent: {
    borderRadius: 15,
    flex: 1,
    width: 340,
    height: 300,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingHorizontal: 9,
    paddingVertical: 22,
  },

  textTheme: {
    fontSize: 20,
    letterSpacing: 0,
    lineHeight: 28,
    fontFamily: "ParkinsansMedium",
    color: "#fff",
    textAlign: "left",
  },

  bannerTheme: {
    backgroundColor: "#fdc731",
    width: '100%',
    flexDirection: "row",
    alignItems: 'center',
    paddingLeft: 22,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    marginVertical: 20,
  },

  categorie: {
    width: 200,
    height: 200,
    marginHorizontal: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },

  themeContainer: {
    gap: 10,
  },

  textDescription:{
    color: 'black',
    fontFamily: 'NotoSansDisplayMedium',
    fontSize: 18,
    paddingTop: 10,
    textAlign: 'center',
  },

  justify: {
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: 210,
  }
});
