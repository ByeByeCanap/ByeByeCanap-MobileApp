import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput, ScrollView} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useState } from "react";
import { Dropdown } from 'react-native-element-dropdown';


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

const groupOptions = [
  { label: "Petit groupe (2-5 personnes)", value: "petit_groupe" },
  { label: "Groupe moyen (6-10 personnes)", value: "groupe_moyen" },
  { label: "Grand groupe (10+ personnes)", value: "grand_groupe" },
];

const genderOptions = [
  { label: "Mixte", value: "mixte" },
  { label: "Non-mixité (uniquement des femmes)", value: "non_mixte_femmes" },
  { label: "Non-mixité (uniquement des hommes)", value: "non_mixte_hommes" },
];

const ageOptions =[
  { label: "18-24 ans", value: "18-24" },
  { label: "25-29 ans", value: "25-29" },
  { label: "30-34 ans", value: "30-34" },
  { label: "35-39 ans", value: "35-39" },
  { label: "40-49 ans", value: "40-49" },
  { label: "50-59 ans", value: "50-59" },
  { label: "60 ans +", value: "60+" },
];

export default function CreateEventScreen( { navigation } ) {

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [interestTheme, setInterestTheme] = useState('');
  const [filteredInterestCategories, setFilteredInterestCategories] = useState(
    []
  );
  const [interestCategorie, setInterestCategorie] = useState('');
  const [place, setPlace] = useState('');
  const [groupPreference, setGroupPreference] = useState('');
  const [genderPreference, setGenderPreference] = useState('');
  const [agePreference, setAgePreference] = useState('');
  const [other, setOther] =useState('');
  const [description, setDescription] = useState('');

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
  };

  const handleInterestThemeChange = (selectedInterestTheme) => {
    setInterestTheme(selectedInterestTheme);
    const selectedActivity = activityOptions.find(
      (activity) => activity.theme === selectedInterestTheme
    );
    setFilteredInterestCategories(
      selectedActivity ? selectedActivity.categorie : []
    );
    setInterestCategorie(null);
  };

  const goHome = () => {
    navigation.navigate('HomeScreen')
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
        <FontAwesome name="arrow-left" size={30} onPress={goHome}/>
        <Text style={styles.h1}>Proposer un événement</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>

    
      {/* Nom de l'événement*/}
      <TextInput
          style={styles.inputTitre}
          value={eventTitle}
          onChangeText={setEventTitle}
          placeholder="Titre de l'événement"
          placeholderTextColor="#A9A9A9"
        />


      {/* image pour l'événement */}
      <Image source={require("../assets/avatars/avatar_2.png")} style={styles.image}></Image>

      <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Définir une image d'événement</Text>
      </TouchableOpacity>


        {/* Thèmes*/}
        <Dropdown
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={styles.itemTextStyle}
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

        {/* Categorie*/} 
        <Dropdown
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
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


        {/* ajouter Heure et Date*/}

        {/* Lieu de l'événement*/}
        <TextInput
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={styles.itemTextStyle}
          style={styles.input}
          value={place}
          onChangeText={setPlace}
          placeholder="Lieu"
          placeholderTextColor="#A9A9A9"
        />

        <View style={styles.section}>
        <Text style={styles.h3} >Préférences</Text>
        </View>

        {/* Nombre de participants */}
        <Dropdown
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={styles.itemTextStyle}
          style={styles.dropdown}
          data={groupOptions}
          labelField="label"
          valueField="value"
          placeholder="Nombre de participants"
          value={groupPreference}
          onChange={(item) => setGroupPreference(item.value)}
        />

        {/* Genre */}
        <Dropdown
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={styles.itemTextStyle}
          style={styles.dropdown}
          data={genderOptions}
          labelField="label"
          valueField="value"
          placeholder="Genre"
          value={genderPreference}
          onChange={(item) => setGenderPreference(item.value)}
        />

        {/* Âge moyen des participants */}
        <Dropdown
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
          style={styles.dropdown}
          data={ageOptions}
          labelField="label"
          valueField="value"
          placeholder="Âge moyen des participants"
          value={agePreference}
          onChange={(item) => setAgePreference(item.value)}
        />

        {/* Autre */}
        <TextInput
          style={styles.input}
          value={other}
          onChangeText={setOther}
          placeholder="Autre"
          placeholderTextColor="#A9A9A9"
        />

        {/* Description de l'événement */}
        <TextInput
          height = {250}
          borderRadius = {19}
          borderColor = "#F3773B"
          borderWidth = {1}
          style={styles.descriptionText}
          onChangeText={(description) => setDescription(description)}
          value={description}
          placeholder="Décrivres-nous l’événments que vous voulez créer !"
        />

         {/* Publier l'événement */}
         <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Publier l'événement</Text>
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
    backgroundColor: 'white'
  },

  arrow: {
    paddingRight: 10,
    paddingLeft: 22,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: 'flex-start',
    gap : 20,
    paddingTop : 20,
    paddingBottom : 20,
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
    width: '80%',
    height: 50,
    marginVertical : 20,
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

  inputTitre : {
    width: "100%",
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

  input: {
    width: "100%",
    height: 50,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#F3773B",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    color: "#282828",
    fontFamily: 'NotoSansDisplayLight',
    fontSize: 16,
    marginBottom : 20,
  },

  image: {
    width : 200,
    height : 200,
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

  placeholderStyle : {
    fontFamily: 'NotoSansDisplayLight',
    fontSize: 16,
  },

  selectedTextStyle : {
    fontFamily: 'NotoSansDisplayLight',
    fontSize: 16,
  },

  itemTextStyle : {
    fontFamily: 'NotoSansDisplayLight',
    fontSize: 16,
  },

  h3: {
    alignSelf: "stretch",
    fontSize: 18,
    fontFamily: "NotoSansDisplayRegular",
    color: "#000",
  },

  section: {
    marginVertical :20,
  }

});
