import React, { useState } from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Dropdown } from "react-native-element-dropdown";

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

export default function UserFormsPage4({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [groupPreference, setGroupPreference] = useState(null);
  const [activityPreference, setActivityPreference] = useState(null);
  const [generationPreference, setGenerationPreference] = useState(null);

  // Charger les polices personnalisées
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

  const GoNext = () => navigation.navigate("UserFormsScreen5");

  return (
    <View style={styles.container}>
      {/* Header */}
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

      {/* Form Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.h1}>Préférences sociales</Text>

        {/* Dropdown 1 */}
        <Text style={styles.h3}>
          Dans quel type de groupe vous sentez-vous à l’aise ?
        </Text>
        <Dropdown
          style={styles.dropdown}
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Choisissez !"
          value={groupPreference}
          onFocus={() => console.log("Focus sur le dropdown")}
          onBlur={() => console.log("Perte de focus")}
          onChange={(item) => setGroupPreference(item.value)}
        />

        {/* Dropdown 2 */}
        <Text style={styles.h3}>
          Préférez-vous des activités avec des personnes ayant des intérêts
          similaires ou divers ?
        </Text>
        <Dropdown
          style={styles.dropdown}
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Choisissez !"
          value={activityPreference}
          onChange={(item) => setActivityPreference(item.value)}
        />

        {/* Dropdown 3 */}
        <Text style={styles.h3}>
          Souhaitez-vous participer à des activités intergénérationnelles ou
          préférez-vous rester avec des personnes proches de votre âge ?
        </Text>
        <Dropdown
          style={styles.dropdown}
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Choisissez !"
          value={generationPreference}
          onChange={(item) => setGenerationPreference(item.value)}
        />

        {/* Arrow Icon */}
        <View style={styles.arrow}>
          <FontAwesome
            name="arrow-right"
            size={40}
            color="black"
            onPress={GoNext}
          />
        </View>
      </ScrollView>

      {/* Footer */}
      <LinearGradient
        style={styles.footer}
        colors={["#fdc731", "#f3773b"]}
        start={{ x: 0, y: 1 }}
      />
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
  },
  arrow: {
    paddingTop: 10,
    flexDirection: "column",
    alignItems: "flex-end",
    alignSelf: "stretch",
  },
});
