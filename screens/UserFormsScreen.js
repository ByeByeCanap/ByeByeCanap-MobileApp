import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { RadioButton } from "react-native-paper";
import { useSelector } from "react-redux";
import { CreateAccount } from "../reducers/users";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Dropdown } from "react-native-element-dropdown";
import { userType } from "../reducers/users";

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

const motivationOptions = [
  { label: "Faire des rencontres", value: "faire_des_rencontres" },
  {
    label: "Apprendre de nouvelles choses",
    value: "apprendre_nouvelles_choses",
  },
  { label: "Passer du bon temps", value: "passer_du_bon_temps" },
  { label: "Développer vos compétences", value: "developper_competences" },
  {
    label: "Se sentir utile ou s'engager dans une cause",
    value: "s_engager_dans_une_cause",
  },
];

const groupOptions = [
  { label: "Petit groupe (2-5 personnes)", value: "petit_groupe" },
  { label: "Groupe moyen (6-10 personnes)", value: "groupe_moyen" },
  { label: "Grand groupe (10+ personnes)", value: "grand_groupe" },
];

const interestOptions = [
  { label: "Similaires", value: "similaires" },
  { label: "Divers", value: "divers" },
];

const ageOptions = [
  { label: "Intergénérationnelles", value: "intergenerationnelles" },
  { label: "Proche de mon âge", value: "proche_de_mon_age" },
  { label: "Peu importe", value: "peu_importe" },
];

const availabilityOptions = [
  { label: "En semaine", value: "en_semaine" },
  { label: "En soirée", value: "en_soiree" },
  { label: "Le week-end", value: "weekend" },
  { label: "Journée", value: "journee" },
];

const placeOptions = [
  { label: "En intérieur", value: "interieur" },
  { label: "En extérieur", value: "exterieur" },
];

const preferencesOptions = [
  { label: "Centré sur les mêmes passions", value: "memes_passions" },
  { label: "Ouvert à la découverte", value: "decouverte" },
];

const valuesOptions = [
  { label: "Bienveillance", value: "bienveillance" },
  { label: "Authenticité", value: "authenticite" },
  { label: "Solidarité", value: "solidarite" },
  { label: "Créativité", value: "creativite" },
];

const projectOptions = [
  { label: "Écologie", value: "ecologie" },
  { label: "Aide sociale", value: "aide_sociale" },
];

const suggestionsOptions = [
  { label: "En fonction de mes centres d’intérêt", value: "interet" },
  { label: "En fonction de mes compétences", value: "competences" },
  { label: "En fonction de mes disponibilités", value: "disponibilites" },
  { label: "en fonction de mes valeurs", value: "valeurs" },
];


export default function UserFormsPage({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [datePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [date, setDate] = useState(new Date());
  const [manualDate, setManualDate] = useState(
    date.toLocaleDateString("fr-FR")
  );
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [interestTheme, setInterestTheme] = useState(null);
  const [interestCategorie, setInterestCategorie] = useState(null);
  const [skillTheme, setSkillTheme] = useState(null);
  const [skillCategorie, setSkillCategorie] = useState(null);
  const [filteredInterestCategories, setFilteredInterestCategories] = useState(
    []
  );
  const [filteredSkillCategories, setFilteredSkillCategories] = useState([]);
  const [checked, setChecked] = useState("");
  const [motivation, setMotivation] = useState(null);
  const [value, onChangeText] = useState("");
  const [groupPreference, setGroupPreference] = useState(null);
  const [activityPreference, setActivityPreference] = useState(null);
  const [generationPreference, setGenerationPreference] = useState(null);
  const [place, setPlace] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [preferences, setPreferences] = useState(null);
  const [values, setValues] = useState([]);
  const [project, setProject] = useState("");
  const [choice, setChoice] = useState(null);
  const [descriptionProfil, setDescriptionProfil] = useState("");


  const user = useSelector((state) => state.users.value);

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

  // TimePickerTest Modal

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formattedDate = date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    setSelectedDate(formattedDate);
    hideDatePicker();
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

  const handleSkillThemeChange = (selectedSkillTheme) => {
    setSkillTheme(selectedSkillTheme);
    const selectedActivity = activityOptions.find(
      (activity) => activity.theme === selectedSkillTheme
    );
    setFilteredSkillCategories(
      selectedActivity ? selectedActivity.categorie : []
    );
    setSkillCategorie(null);
  };

  const GoNext = () => {
          fetch('http://10.10.200.19:3000/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName : firstName,
        lastName : lastName,
        email : email,
        nickName: nickName,
        birthdate: date.toISOString(),
        gender : gender,
        password : password,
        userType : user.userType, 
        birthdate : selectedDate,
        themesInterest : interestTheme,
        categoriesInterest : interestCategorie,
        themesSkill : skillTheme,
        categoriesSkill : skillCategorie,
        motivations : motivation,
        preferredGroupType : groupPreference,
        preferredPeople : generationPreference,
        availability : availability,
        locationPreference : place,
        personalValues : values,
        causes : project,
        suggestions : choice,
        descriptionProfile : descriptionProfil,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        });

    navigation.navigate("TabNavigator", { screen: "HomeScreen" });
  };

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
        <Text style={styles.h1} >Identité et généralités</Text>

        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Prénom"
          placeholderTextColor="#A9A9A9"
        />
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Nom"
          placeholderTextColor="#A9A9A9"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#A9A9A9"
        />
        <TextInput
          style={styles.input}
          value={nickName}
          onChangeText={setNickName}
          placeholder="Nom d'utilisateur"
          placeholderTextColor="#A9A9A9"
        />

          <View style={styles.dateInputContainer}>
            <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
              <Text style={styles.dateText}>
                {selectedDate || "Date de naissance"}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={datePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>

          <Text style={styles.h3}>
            Quel est votre genre ?
          </Text>
          <View style={styles.radioGroup}>
          <RadioButton.Group
            onValueChange={(newValue) => setChecked(newValue)}
            value={checked}
          >
            {["Homme", "Femme", "Autre"].map((value) => (
              <View key={value} style={styles.radioItem}>
                <RadioButton
                  value={value}
                  backgroundColor= '#F3773B'
                  color="white"
                  style={styles.radiobtn}
                />
                <Text style={styles.radioText}>{value}</Text>
              </View>
            ))}
          </RadioButton.Group>
          </View>


        <View style={styles.passwordInput}>
          <TextInput
            style={styles.inputFlex}
            value={password}
            onChangeText={setPassword}
            placeholder="Mot de passe"
            placeholderTextColor="#A9A9A9"
            fontFamily= 'NotoSansDisplayLight'
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome
              name={showPassword ? "eye" : "eye-slash"}
              size={24}
              color="#000"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordInput}>
          <TextInput
            style={styles.inputFlex}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirmer mot de passe"
            placeholderTextColor="#A9A9A9"
            secureTextEntry={!showConfirmPassword}
            fontFamily= 'NotoSansDisplayLight'
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <FontAwesome
              name={showConfirmPassword ? "eye" : "eye-slash"}
              size={24}
              color="#000"
            />
          </TouchableOpacity>
        </View>

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

        {/* Radiobutton Association Choice */}
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
                <RadioButton
                  value={value}
                  backgroundColor= '#F3773B'
                  color="white"
                />
                <Text style={styles.radioText}>{value}</Text>
              </View>
            ))}
          </RadioButton.Group>
        </View>

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

        <Text style={styles.h1}>Disponibilités</Text>

        <Text style={styles.h3}>Quand êtes-vous disponible ?</Text>
        <Dropdown
          style={styles.dropdown}
          data={availabilityOptions}
          labelField="label"
          valueField="value"
          placeholder="Vos disponibilités"
          value={availability}
          onChange={(item) => setAvailability(item.value)}
        />

        <Text style={styles.h3}>
          Avez-vous des préférences pour le lieu des activités ?
        </Text>
        <Dropdown
          style={styles.dropdown}
          data={placeOptions}
          labelField="label"
          valueField="value"
          placeholder="Vos préférences"
          value={place}
          onChange={(item) => setPlace(item.value)}
        />

        <Text style={styles.h1}>Affinités et Valeurs</Text>

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
          value={project}
          onChange={(item) => setProject(item.value)}
        />

        <Text style={styles.h1}>Matching et Suggestions</Text>

        <Text style={styles.h3}>
          Je veux des suggestions personnalisées d’activités ou de groupes..
        </Text>
        <Dropdown
          style={styles.dropdown}
          data={suggestionsOptions}
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
          onChangeText={(descriptionProfil) =>
            setDescriptionProfil(descriptionProfil)
          }
          value={descriptionProfil}
          placeholder="Dites-nous en plus !"
        />

        <TouchableOpacity style={styles.button} onPress={GoNext}>
          <Text style={styles.text}>Soumettre profil</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  content: {
    alignItems: "center",
    padding: 30,
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
    marginTop: 40,
    marginBottom: 40,
  },
  h3: {
    alignSelf: "stretch",
    fontSize: 18,
    fontFamily: "NotoSansDisplayRegular",
    color: "#000",
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#F3773B",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    marginVertical: 10,
    color: "#282828",
    fontFamily: 'NotoSansDisplayLight',
    fontSize: 16,
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 300,
    height: 50,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#F3773B",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    marginVertical: 10,
    fontFamily: 'NotoSansDisplayLight',
    fontSize: 16,
  },
  dateInput: {
    flex: 1,
    fontSize: 16,
    color: "#282828",
    width: "100%",
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
    marginVertical: 10,
  },
  radioText: {
    fontSize: 16,
    fontFamily: "NotoSansDisplayLight",
    color: "#000",
    marginHorizontal: 10,
  },
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#F3773B",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    marginVertical: 10,
    width: "100%",
    fontFamily: 'NotoSansDisplayLight',
    fontSize: 16,
  },
  inputFlex: {
    flex: 1,
    fontSize: 16,
    color: "#282828",
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

  textInput: {
    borderWidth: 1,
    width: "100%",
    height: 300,
    borderColor: "#F3773B",
    borderRadius: 15,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    marginVertical: 10,
    color: "#282828",
    fontFamily: 'NotoSansDisplayLight',
    fontSize: 16,
  },
  button: {
    backgroundColor: "#F3773B",
    paddingTop: 10,
    borderRadius: 19,
    marginVertical: 40,
    alignItems: "center",
    width: "70%",
    height: 50,
  },
  text: {
    color: "white",
    fontFamily: "ParkinsansMedium",
    fontSize: 20,
  },

  input: {
    width: "100%",
    height: 50,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#F3773B",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    marginVertical: 10,
    color: "#282828",
    fontFamily: "NotoSansDisplayLight",
    fontSize: 16,
  },
  
  dateInputContainer: {
    width: "100%",
    height: 50,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#F3773B",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    marginVertical: 10,
    color: "#282828",
    fontFamily: "NotoSansDisplayLight",
    fontSize: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // Aligne le contenu à droite
  },
  
  dateButton: {
    flex: 1,
    justifyContent: "center",
  },
  
  dateText: {
    color: "#A9A9A9",
    fontFamily: "NotoSansDisplayLight",
    fontSize: 16,
    textAlign: "left", // Aligne le texte à droite
  },
  
});
