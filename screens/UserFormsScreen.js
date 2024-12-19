import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { RadioButton } from "react-native-paper";
import { useSelector } from "react-redux";
import { CreateAccount } from "../reducers/users";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Dropdown } from "react-native-element-dropdown";
import {
  activityOptions,
  motivationOptions,
  groupOptions,
  interestOptions,
  ageOptions,
  availabilityOptions,
  placeOptions,
  preferencesOptions,
  valuesOptions,
  projectOptions,
  suggestionsOptions,
} from "../utils/userFormList";
import { BACK_IP } from "../env";
import Header from "../components/header";

export default function UserFormsPage({ navigation }) {
  // Construire la variable dispatch quelque soit le nombre de reducer
  const dispatch = useDispatch();

  // Custom font
  // Android and iOS come with their own set of platform fonts
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Authentification --------------------------------------------------------------------------
  // Identitty
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [gender, setGender] = useState("");

  // Password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Dates ------------------------------------------------------------------------------------------
  const [datePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [date, setDate] = useState(new Date());
  const [manualDate, setManualDate] = useState(
    date.toLocaleDateString("fr-FR")
  ); // UseState pas utilisé

  // Interests, Skills  and motivation ----------------------------------------------------------------
  const [interestTheme, setInterestTheme] = useState(null);
  const [interestCategorie, setInterestCategorie] = useState(null);
  const [filteredInterestCategories, setFilteredInterestCategories] = useState(
    []
  );

  const [skillTheme, setSkillTheme] = useState(null);
  const [skillCategorie, setSkillCategorie] = useState(null);
  const [filteredSkillCategories, setFilteredSkillCategories] = useState([]);
  // Pour le bénévolat
  const [helper, setHelper] = useState("");

  const [motivation, setMotivation] = useState(null);
  // Description sur les attentes (Text Input)
  const [value, onChangeText] = useState("");

  // Préférences ----------------------------------------------------------------------------------------
  // taille group
  const [groupPreference, setGroupPreference] = useState(null);
  // centre d'intérêt communs ou différent
  const [activityPreference, setActivityPreference] = useState(null);
  // génération
  const [generationPreference, setGenerationPreference] = useState(null);
  // temps: plutôt semaine, week-end etc ...
  const [availability, setAvailability] = useState([]);
  // plutôt à l'intérieur
  const [place, setPlace] = useState(null);
  // centre d'intérêt communs ou différent ATTENTION DOUBLON !!!
  const [preferences, setPreferences] = useState(null);

  // Affinités & valeurs ---------------------------------------------------------------------------------
  const [values, setValues] = useState([]);
  const [project, setProject] = useState("");
  const [choice, setChoice] = useState(null);
  const [descriptionProfil, setDescriptionProfil] = useState("");

  // Info from reducer
  const user = useSelector((state) => state.users.value);
  // console.log(user);

  // Font.loadAsync = méthode fournie par la bibliothèque expo-font
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

  // TimePickerTest Modal: test lié à la sélection d'une heure (time picker) ???????????????????????????????????
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

  // Handle, interests, Skills  and motivation ----------------------------------------------------------------
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

  // When clicking on Submit button => fetch(POST) to Backend
  const GoNext = async () => {
    if (!emailRegex.test(email)) {
        alert("L'adresse email n'est pas valide.");
        return; // Arrête l'exécution si l'email est invalide
      }
    
      if (!passwordRegex.test(password)) {
        alert(
          "Le mot de passe doit contenir au moins 8 caractères, une lettre et un chiffre."
        );
        return; // Arrête l'exécution si le mot de passe est invalide
      }
    
      if (password !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas.");
        return; // Arrête l'exécution si les mots de passe ne correspondent pas
      };
    const Userdata = {
      email: email,
      password: password,
      lastName: lastName,
      userType: user.userType,
      firstName: firstName,
      birthDate: selectedDate,
      gender: gender,
      nickName: nickName,

      themesInterest: interestTheme,
      categoriesInterest: interestCategorie,
      themesSkill: skillTheme,
      categoriesSkill: skillCategorie,
      motivations: motivation,
      preferredGroupType: groupPreference,
      preferredPeople: generationPreference,
      availability: availability,
      locationPreference: place,
      personalValues: values,
      causes: project,
      suggestions: choice,
      descriptionProfile: descriptionProfil,
    };

    console.log(Userdata);

    try {
      const response = await fetch(`${BACK_IP}/users/signup/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Userdata),
      });

      const data = await response.json();

      if (data.token !== undefined) {
        navigation.navigate("TabNavigator");
      }

      dispatch(
        CreateAccount({
          token: data.token,
          email: email,
          password: password,
          lastName: lastName,
          firstName: firstName,
          nickName: nickName,
          birthDate: selectedDate,
          gender: gender,
        })
      );

      // Reset form fields
      setFirstName("");
      setLastName("");
      setNickName("");
      setEmail("");
      setGender("");
      setPassword("");
      setConfirmPassword("");
      setShowPassword(false);
      setShowConfirmPassword(false);
      setDatePickerVisibility(false);
      setSelectedDate(null);
      setInterestTheme(null);
      setInterestCategorie(null);
      setFilteredInterestCategories([]);
      setSkillTheme(null);
      setSkillCategorie(null);
      setFilteredSkillCategories([]);
      setHelper("");
      setMotivation(null);
      onChangeText("");
      setGroupPreference(null);
      setActivityPreference(null);
      setGenerationPreference(null);
      setAvailability([]);
      setPlace(null);
      setPreferences(null);
      setValues([]);
      setProject("");
      setChoice(null);
      setDescriptionProfil("");

      console.log("clique sur le Submit", `${BACK_IP}/users/signup`);
      console.log("DATA DU STORE", "userType:", user);

      // Navigate after successful signup
      navigation.navigate("TabNavigator", { screen: "HomeScreen" });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.h1}>Identité et généralités</Text>

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
          style={[styles.input, !emailRegex.test(email) && email !== "" ? { borderColor: "red" } : {}]}
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

        <Text style={styles.h3}>Quel est votre genre ?</Text>
        <View style={styles.radioGroup}>
          <RadioButton.Group
            onValueChange={(newValue) => setGender(newValue)}
            value={gender}
          >
            {["Homme", "Femme", "Autre"].map((value) => (
              <View key={value} style={styles.radioItem}>
                <RadioButton
                  value={value}
                  backgroundColor="#F3773B"
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
            style={[styles.inputFlex, !passwordRegex.test(password) && password !== "" ? { borderColor: "red" } : {}]}
            value={password}
            onChangeText={setPassword}
            placeholder="Mot de passe"
            placeholderTextColor="#A9A9A9"
            fontFamily="NotoSansDisplayLight"
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
            fontFamily="NotoSansDisplayLight"
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
            onValueChange={(newValue) => setHelper(newValue)}
            value={helper}
          >
            {["Oui", "Non"].map((value) => (
              <View key={value} style={styles.radioItem}>
                <RadioButton
                  value={value}
                  backgroundColor="#F3773B"
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
          maxLength={500}
          multiline={true}
          editable={true}
          textAlignVertical="top"
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
          maxLength={500}
          multiline={true}
          editable={true}
          textAlignVertical="top"
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
    backgroundColor: "white",
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
    fontSize: 22,
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
    fontFamily: "NotoSansDisplayLight",
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
    fontFamily: "NotoSansDisplayLight",
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
    fontFamily: "NotoSansDisplayLight",
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
    fontFamily: "NotoSansDisplayLight",
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
    textAlign: "left",
  },
});
