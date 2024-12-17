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
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { Dropdown } from "react-native-element-dropdown";

// Import for reducer use
import { useState } from "react";
import { useSelector } from "react-redux";

// Import option for creation of events
import {
  activityOptions,
  groupOptions,
  genderOptions,
  ageOptionsCreateEvent
} from "../utils/userFormList";

// Import for fetch
import { BACK_IP } from "@env";


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
  const [filteredInterestCategories, setFilteredInterestCategories] = useState([]);
  const [referenceEvent, setReferenceEvent] = useState("");
  const [place, setPlace] = useState("");
  const [eventDate, setEventDate] = useState("");
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
const handleImage = () => {

}



// Create an event ---------------------------------------------------------------------------------
// || 
//       !interestTheme ||
//       !interestCategorie ||
//       !place ||
//       !eventDate ||
//       !groupPreference ||
//       !genderPreference |
//       !agePreference
  const handleCreateEvent= () => {

    // console.log("click ok"); // click fonctionne
    

    if (!eventTitle ) return;
const dataFetch = {

  //organizer:organizerId, // foreign key from profileInfos
  title:"eventTitle",
  theme:"interestTheme",
  category:"interestCategorie",
  reference:"TxCyNz",
  image:"url",
  eventDate:"2024-12-13",
  location:"place",
  sizeGroup:"groupPreference",
  description:"description",
  preferences: {age: "agePreference", gender:"genderPreference", other:"other"}, // sous-doc
  participants:[], // foreign key from users
  isFinished: false,
  token: user.token,        
  
  // //organizer:organizerId, // foreign key from profileInfos
  // title:eventTitle,
  // theme:interestTheme,
  // category:interestCategorie,
  // reference:"TxCyNz",
  // image:"url",
  // eventDate: "2024-12-13",
  // location:place,
  // sizeGroup:groupPreference,
  // description:description,
  // preferences: {age: agePreference, gender:genderPreference, other:other}, // sous-doc
  // participants:[], // foreign key from users
  // isFinished: false,
  // token: user.token,
}

console.log(dataFetch)

  //   fetch(`${BACK_IP}/events/propositionEvent`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("fetch ok", data)
  //       // if (data && data.event) {
  //       // setorganizer(""), // foreign key from profileInfos
  //       // settitle(""),
  //       // settheme(""),
  //       // setcategory(""),
  //       // setreference(""),
  //       // setimage(""),
  //       // seteventDate(""),
  //       // setlocation(""),
  //       // setsizeGroup(""),
  //       // setdescription(""),
  //       // setpreferences(""),
  //       // setparticipants(""),
  //       // setisFinished(""),
  //       // settoken(""),
  //       // }
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error.message);
  //     });

  //    // navigation.navigate("TabNavigator", { screen: "HomeScreen" });
  };

  // Go to previous screen -----------------------------------------------------------------------
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
          data={ ageOptionsCreateEvent}
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
          height={250}
          borderRadius={19}
          borderColor="#F3773B"
          borderWidth={1}
          style={styles.descriptionText}
          onChangeText={(description) => setDescription(description)}
          value={description}
          placeholder="Décrivres-nous l’événments que vous voulez créer !"
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
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

  content: {
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 30,
  },

  button: {
    backgroundColor: "#F3773B",
    padding: 10,
    borderRadius: 19,
    marginVertical: 10,
    alignItems: "center",
    width: "80%",
    height: 50,
    marginVertical: 20,
  },
  text: {
    color: "white",
    fontFamily: "ParkinsansMedium",
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
});
