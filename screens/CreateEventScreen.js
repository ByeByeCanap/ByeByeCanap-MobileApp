import React from "react";
// Import for style
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
// Import for reducer use
import { useState } from "react";
import { useSelector } from "react-redux";

// Import option for creation of events
import {
  activityOptions,
  groupOptions,
  genderOptions,
  ageOptionsCreateEvent,
} from "../utils/userFormList";

// Import for fetch
import { BACK_IP } from "../env";
import Header from "../components/header";

export default function CreateEventScreen({ navigation }) {
  // Custom font --------------------------------------------------------------------------------
  // Android and iOS come with their own set of platform fonts
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const loadFonts = async () => {
    await Font.loadAsync({
      ParkinsansMedium: require("../assets/fonts/ParkinsansMedium.ttf"),
      NotoSansDisplayLight: require("../assets/fonts/NotoSansDisplayLight.ttf"),
      NotoSansDisplayRegular: require("../assets/fonts/NotoSansDisplayRegular.ttf"),
    });
  };

  // Preparation for creation of events -------------------------------------------------------
  //const [organizerId, setOrganizerId] = useState(""); // foreign key from porfileInfos
  const [eventTitle, setEventTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Thèmes: interestTheme, setInterestTheme to fetch to back
  const [interestTheme, setInterestTheme] = useState("");
  // Catégories (interestCategorie, setInterestCategorie to fetch to back)
  const [interestCategorie, setInterestCategorie] = useState("");
  const [filteredInterestCategories, setFilteredInterestCategories] = useState(
    []
  );
  const [referenceEvent, setReferenceEvent] = useState("");
  const [place, setPlace] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  // sizeGroup
  const [groupPreference, setGroupPreference] = useState("");
  // Preferences sous-doc: sizeGroup, Gender, âge selection et autre description
  const [genderPreference, setGenderPreference] = useState("");
  const [agePreference, setAgePreference] = useState("");
  const [other, setOther] = useState("");
  // Participant
  //const [participants, setParticipants] = useState(""); // foreign key from users
  const [description, setDescription] = useState("");
  // isFinished
  const [isFinished, setIsFinished] = useState("");
  //const [adress, zipcode] fetch dans le back
  const [adress, setAdress] = useState("");
  const [zipcode, setZipcode] = useState(null);
  // Token to be retreived from reducer
  const user = useSelector((state) => state.users.value);

  // const goBack = () => navigation.navigate('SolutionPage');
  // const publishEvent = () => navigation.naviagte('HomePage'); ?? On navigue vers quelle page une fois le formulaire complété ?
  // ajouter TabNavigation

  // Application of style -----------------------------------------------------------------
  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={(err) => console.error(err)}
      />
    );
  }

  // Theme & category selection
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

  // Definir Image
  // const [imageUrl, setImageUrl] = useState("");
  const handleImage = () => {};
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setEventDate(selectedDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const updatedDate = new Date(eventDate);
      updatedDate.setHours(selectedTime.getHours());
      updatedDate.setMinutes(selectedTime.getMinutes());
      setEventDate(updatedDate);
    }
  };
  const handleCreateEvent = () => {
    // eventTitle, interestTheme, interestCategorie, place, groupPreference, genderPreference, agePreference, other, description
    fetch(`${BACK_IP}/events/createEvent/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: user.token,
      },
      body: JSON.stringify({
        title: eventTitle,
        theme: interestTheme,
        category: interestCategorie,
        eventDate: eventDate.toISOString(),
        location: place,
        sizeGroup: groupPreference,
        description: description,
        ageRange: agePreference,
        gender: genderPreference,
        other: other,
        adress: adress,
        zipcode: zipcode,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
    alert("Votre évènement a bien été créé");
    navigation.navigate("TabNavigator");
  };

  // Go to previous screen -----------------------------------------------------------------------
  const goBack = () => {
    navigation.navigate("TabNavigator");
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.arrow}>
        <FontAwesome name="arrow-left" size={30} onPress={goBack} />
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
        <Image
          source={require("../assets/avatars/avatar_2.png")}
          style={styles.image}
          onPress={handleImage}
        ></Image>

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

        {/* ajouter date*/}
        <TouchableOpacity
          style={styles.inputDate}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.itemTextStyle}>
            {`Date de l'événement : ${eventDate.toLocaleDateString()}`}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={eventDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* Sélecteur d'heure */}
        <TouchableOpacity
          style={styles.inputDate}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.itemTextStyle}>
            {`Heure de l'événement : ${eventDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}`}
          </Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={eventDate}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}
        {/* Lieu de l'événement*/}
        <TextInput
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={styles.itemTextStyle}
          style={styles.input}
          value={adress}
          onChangeText={setAdress}
          placeholder="Adresse du lieu"
          placeholderTextColor="#A9A9A9"
        />

        {/* Code postal*/}
        <TextInput
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={styles.itemTextStyle}
          style={styles.input}
          value={zipcode}
          onChangeText={setZipcode}
          placeholder="Code postal"
          placeholderTextColor="#A9A9A9"
        />

        <View style={styles.section}>
          <Text style={styles.h3}>Préférences</Text>
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
          data={ageOptionsCreateEvent}
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
          maxLength={500}
          multiline={true}
          editable={true}
          textAlignVertical="top"
          height={250}
          borderRadius={19}
          borderColor="#F3773B"
          borderWidth={1}
          style={styles.descriptionText}
          onChangeText={(description) => setDescription(description)}
          value={description}
          placeholder="Décrivez-nous l’événment que vous voulez créer !"
        />

        {/* Publier l'événement */}
        <TouchableOpacity style={styles.button} onPress={handleCreateEvent}>
          <Text style={styles.text}>Publier l'événement</Text>
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

  h1: {
    fontSize: 20,
    fontFamily: "ParkinsansMedium",
    color: "#000",
  },
  button: {
    backgroundColor: "#F3773B",
    justifyContent: "center",
    borderRadius: 19,
    alignItems: "center",
    width: "100%",
    height: 50,
    marginVertical: 20,
  },
  text: {
    color: "white",
    fontFamily: "ParkinsansMedium",
    fontSize: 16,
  },

  inputTitre: {
    width: "100%",
    height: 50,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#F3773B",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    color: "#282828",
    fontFamily: "ParkinsansMedium",
    fontSize: 20,
    marginBottom: 20,
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
    fontFamily: "NotoSansDisplayLight",
    fontSize: 16,
    marginBottom: 20,
  },
  inputDate: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#F3773B",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    color: "#282828",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
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

  placeholderStyle: {
    fontFamily: "NotoSansDisplayLight",
    fontSize: 16,
  },

  selectedTextStyle: {
    fontFamily: "NotoSansDisplayLight",
    fontSize: 16,
  },

  itemTextStyle: {
    fontFamily: "NotoSansDisplayLight",
    fontSize: 16,
  },

  h3: {
    alignSelf: "stretch",
    fontSize: 18,
    fontFamily: "NotoSansDisplayRegular",
    color: "#000",
  },

  section: {
    marginVertical: 20,
  },
  descriptionText: {
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
});
