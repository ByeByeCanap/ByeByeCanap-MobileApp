import React, { useState } from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Dropdown } from "react-native-element-dropdown";

const groupOptions = [
  { label: 'Petit groupe (2-5 personnes)', value: 'petit_groupe' },
  { label: 'Groupe moyen (6-10 personnes)', value: 'groupe_moyen' },
  { label: 'Grand groupe (10+ personnes)', value: 'grand_groupe' }
];


const interestOptions = [
  { label: 'Similaires', value: 'similaires' },
  { label: 'Divers', value: 'divers' }
];

const ageOptions = [
  { label: 'Intergénérationnelles', value: 'intergenerationnelles' },
  { label: 'Proche de mon âge', value: 'proche_de_mon_age' },
  { label: 'Peu importe', value: 'peu_importe' }
];

export default function UserFormsPage4({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [groupPreference, setGroupPreference] = useState(null);
  const [activityPreference, setActivityPreference] = useState(null);
  const [generationPreference, setGenerationPreference] = useState(null);


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
          data={groupOptions}
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
          data={interestOptions}
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
          data={ageOptions}
          labelField="label"
          valueField="value"
          placeholder="Choisissez !"
          value={generationPreference}
          onChange={(item) => setGenerationPreference(item.value)}
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
  },
  arrow: {
    paddingTop: 10,
    flexDirection: "column",
    alignItems: "flex-end",
    alignSelf: "stretch",
  },
});
