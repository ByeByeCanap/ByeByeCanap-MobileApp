import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Header } from "../components/header";
// Import for fetch
import { BACK_IP } from "../env";

export default function EventDetailScreen({ navigation, route }) {
  // Retreive information from previous page
  const eventsIds = route.params.eventsIds;

  // Hook to update the list of themes and categories
  const [eventById, setEventById] = useState([]);
  //console.log(eventById);

  // Token to be retreived from reducer
  const user = useSelector((state) => state.users.value);
  console.log("current user TOKEN", user.token);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(
          `${BACK_IP}/events/byEventId/${eventsIds}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setEventById([data.result]);
        //console.log("Fetched event data:", data.result); // Log the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEventData();
  }, []);

  console.log(eventById[0]); // Log the eventById state

  const event = eventById[0];
  //const title = event ? event.title : '';
  // Conditional rendering to ensure event is accessed only after data is fetched
  if (!event) {
    return <Text>Loading...</Text>;
  }

  console.log(eventById[0]);

  const goRequestScreen = (token, eventId) => {
    fetch(`${BACK_IP}/events/participantEvent`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({
        eventId: eventId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("Click Participer:", data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
    navigation.navigate("RequestScreen");
  };

  const goBack = () => {
    navigation.navigate("SearchEventScreen");
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
        <Text style={styles.h1}>{event.title}</Text>

        {/* reducer, nom de l'événement de la page précédente */}
      </View>
      {eventById.length > 0 && (
        <ScrollView contentContainerStyle={styles.content}>
          <ImageBackground
            source={require("../assets/imagesEvent/event_main.jpg")}
            style={styles.mainEvent}
            imageStyle={{ borderRadius: 15 }}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              goRequestScreen(user.token, eventById[0]._id);
            }}
          >
            <Text style={styles.text}>Je participe !</Text>
          </TouchableOpacity>

          <View style={styles.informationContainer}>
            <Image
              style={{ width: 100, height: 100 }}
              source={require("../assets/imagesEvent/profil_1.jpg")}
              size={10}
            ></Image>
            <View style={styles.description}>
              <Text style={styles.textDescription}>
                {event.location.adress}
              </Text>
              <Text style={styles.textDescription}>
                {event.location.zipcode}
              </Text>
              <Text style={styles.textDescription}>
                {event.eventDate.slice(0, 10)} à 20H30
              </Text>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.textBody}>{event.description}</Text>
          </View>

          <Text style={styles.h1}>
            Déjà {event.participants.length} participants
          </Text>

          <View style={styles.avatarContainer}>
            <FlatList
              data={[
                { id: "1" },
                { id: "2" },
                { id: "3" },
                { id: "4" },
                { id: "5" },
              ]}
              horizontal
              keyExtractor={(item) => item.id}
              renderItem={() => (
                <View style={styles.avatarFake}>
                  <Image
                    style={styles.logoFake}
                    resizeMode="cover"
                    source={require("../assets/avatar1.png")}
                  />
                </View>
              )}
            />
          </View>
        </ScrollView>
      )}
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

  button: {
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

  informationContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    paddingLeft: 20,
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
    // backgroundColor: "grey",
  },

  textDescription: {
    color: "black",
    fontFamily: "NotoSansDisplayMedium",
    fontSize: 18,
    paddingTop: 10,
    fontWeight: "bold",
  },

  descriptionContainer: {
    borderWidth: 2,
    width: "90%",
    height: "auto",
    borderColor: "#F3773B",
    borderRadius: 15,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    marginVertical: 20,
    padding: 20,
  },

  textBody: {
    fontFamily: "NotoSansDisplayLight",
    fontSize: 16,
  },

  avatarContainer: {
    flexDirection: "row",
    paddingVertical: 25,
  },
  avatarFake: {
    marginHorizontal: 10,
  },
  logoFake: {
    borderRadius: 120,
    borderWidth: 2,
    width: 80,
    height: 80,
  },
});
