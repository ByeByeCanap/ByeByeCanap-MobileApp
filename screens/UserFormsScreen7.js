import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Dropdown } from "react-native-element-dropdown";

export default function UserFormsPage7({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [choice, setChoice] = useState(null);
  const [value, onChangeText] = useState("");

  const loadFonts = async () => {
    await Font.loadAsync({
      ParkinsansMedium: require("../assets/fonts/ParkinsansMedium.ttf"),
      NotoSansDisplayLight: require("../assets/fonts/NotoSansDisplayLight.ttf"),
      NotoSansDisplayRegular: require("../assets/fonts/NotoSansDisplayRegular.ttf"),
    });
  };

  const dropdownOptions = [
    { label: "Choice1", value: "choice2" },
    { label: "Choice2", value: "choice2" },
    { label: "Choice3", value: "choice3" },
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

  const GoNext = () => navigation.navigate("HomeScreen");

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
        <Text style={styles.h1}>Matching et Suggestions</Text>

        <Text style={styles.h3}>
          Pourquoi voulez-vous participer à des activités ?
        </Text>
        <Dropdown
          style={styles.dropdown}
          data={dropdownOptions}
          labelField="label"
          valueField="value"
          placeholder="Choisissez !"
          value={choice}
          onChange={(item) => setChoice(item.value)}
        />

        <Text style={styles.h3}>
          Pour finir, une petite description sur vous ?
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => onChangeText(text)}
          value={value}
          placeholder="Dites-nous en plus !"
        />

        <TouchableOpacity style={styles.button} onPress={GoNext}>
          <Text style={styles.text}>Soumettre profil</Text>
        </TouchableOpacity>
      </ScrollView>

      <LinearGradient
        style={styles.footer}
        colors={["#fdc731", "#f3773b"]}
        start={{ x: 0, y: 1 }}
      />
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

  button: {
    backgroundColor: "#F3773B",
    paddingTop: 10,
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
});
