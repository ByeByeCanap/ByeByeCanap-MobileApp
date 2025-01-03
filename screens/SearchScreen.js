import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import Header from "../components/header";
// Import for fetch
import { BACK_IP } from "../env";

export default function SearchScreen({ navigation, route }) {
  // Retreive information from previous page
  const token = route.params.token;
  const id = route.params.id;
  const categoryName = route.params.categoryName;
  //console.log("look user.token", token, "look data.id", id, "look at category:", categoryName);

  // Hook to update the list of themes and categories
  const [eventByCategory, setEventByCategory] = useState([]);

  useEffect(() => {
    const fetchEventsByCategory = async () => {
      try {
        const response = await fetch(
          `${BACK_IP}/events/byCategory/${categoryName}`
        );
        const events = await response.json();

        setEventByCategory(events);
      } catch (error) {
        console.error("Error fetching events by category:", error.message);
      }
    };

    fetchEventsByCategory();
  }, [categoryName]);

  //console.log("Events", eventByCategory);
  const eventsIds = eventByCategory.map((event, index) => event._id);
  console.log("Data fetch events by category", eventsIds);

  function gotToDetails(eventsIds) {
    //console.log("DATA:", eventsIds);
    navigation.navigate("EventDetailScreen", {
      token,
      eventsIds,
    });
  }

  // console.log("look at getter", eventByCategory);

  const card = eventByCategory.map((event, index) => {
    return (
      <View key={index} style={styles.card}>
        <View style={styles.imageContainer}>
          <Pressable onPress={() => gotToDetails(event._id)}>
            <Image
              source={require("../assets/imagesEvent/default.jpg")}
              style={styles.image}
            />
          </Pressable>
        </View>

        <View style={styles.globalContainer}>
          <View>
            <Text style={styles.h2}>{event.eventDate.slice(0,10)} à {event.eventDate.slice(11,16)}</Text>
          </View>

          <Text style={styles.h1Event}>{event.title}</Text>
          <Text style={styles.body}>{event.location.adress}</Text>
          <Text style={styles.body}>{event.location.zipcode}</Text>
          <Text style={styles.body}>
            Nombre de partipants: {event.participants.length}
          </Text>
        </View>
      </View>
    );
  });

  const goBack = () => {
    navigation.navigate("SearchEventScreen");
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      <View style={styles.arrow}>
        <FontAwesome name="arrow-left" size={30} onPress={goBack} />
        <Text style={styles.h1}>Liste des événements</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>{card}</ScrollView>
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

  h1: {
    fontSize: 20,
    fontFamily: "ParkinsansMedium",
    color: "#000",
  },

  h1Event: {
    fontSize: 20,
    fontFamily: "ParkinsansMedium",
    color: "#000",
    flexWrap: "wrap",
    width: 200,
  },

  card: {
    flexDirection: "row",
    gap: 10,
    width: "80%",
    height: 200,
    paddingHorizontal: 10,
    marginVertical: 10,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    elevation: 8,
    shadowOpacity: 1,
    borderRadius: 15,
    flex: 1,
    width: "100%",
    padding: 10,
    backgroundColor: "#fff",
  },

  h2: {
    fontFamily: "NotoSansDisplayRegular",
    fontSize: 16,
  },

  logoProfil: {
    width: 60,
    height: 60,
  },

  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },

  imageContainer: {
    justifyContent: "center",
  },

  globalContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
  },

  body: {
    fontFamily: "NotoSansDisplayLight",
    fontSize: 12,
  },
});
