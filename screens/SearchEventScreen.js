import React from "react";
// Import for style
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
// Import hook
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// Import for Themes and Categories list
//import { activityOptions } from "../utils/userFormList";
// Import for fetch
import { BACK_IP } from "../env";
import Header from "../components/header";

export default function SearchEventScreen({ navigation }) {
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

    // Hook to update the list of themes and categories
    const [activityOptionsList, setactivityOptionsList] = useState([]);

    // Info from reducer
    const user = useSelector((state) => state.users.value);

    // Fetch all events -------------------------------------------------------------------------------
    useEffect(() => {
        const fetchAllEvents = async () => {
            try {
                const response = await fetch(`${BACK_IP}/events/allEvents`);
                const data = await response.json();

                // Use reduce to group categories by themes
                const groupThemesCategories = data.result.reduce(
                    (activityOptions, event) => {
                        const allThemes = activityOptions.find(
                            (element) => element.theme === event.theme
                        );

                        if (allThemes) {
                            if (!allThemes.categorie.includes(event.category)) {
                                allThemes.categorie.push(event.category);
                            }
                        } else {
                            activityOptions.push({
                                theme: event.theme,
                                categorie: [event.category],
                                id: event._id,
                            });
                        }
                        return activityOptions;
                    },
                    []
                );

                // Sort categories alphabetically for each theme
                groupThemesCategories.forEach((theme) => {
                    theme.categorie.sort((a, b) => a.localeCompare(b));
                });

                // Sort themes alphabetically
                groupThemesCategories.sort((a, b) =>
                    a.theme.localeCompare(b.theme)
                );

                setactivityOptionsList(groupThemesCategories);
            } catch (error) {
                console.error("Error fetching events:", error.message);
            }
        };

        fetchAllEvents();
    }, []);

    if (!fontsLoaded) {
        return (
            <AppLoading
                startAsync={loadFonts}
                onFinish={() => setFontsLoaded(true)}
                onError={(err) => console.error(err)}
            />
        );
    }

    function gotTocategory(data) {
        //console.log("Ou est la CATEGORYYYYY", data.categorie[0], "DATA:",data);
        goRequestScreen(user.token, data.id);
        navigation.navigate("SearchScreen", {
            token: user.token,
            id: data.id,
            categoryName: data.categorie[0],
        });
    }

    const catalogue = activityOptionsList.map((data, index) => {
        return (
            <View key={index}>
                <View style={styles.bannerTheme}>
                    <Text style={styles.textTheme}>{data.theme}</Text>
                </View>

                <ScrollView horizontal={true} style={styles.themeContainer}>
                    {data.categorie.map((category, categoryIndex) => {
                        const imageSource = [
                            require(`../assets/imagesEvent/theme_0.jpg`),
                            require(`../assets/imagesEvent/theme_1.jpg`),
                            require(`../assets/imagesEvent/theme_2.jpg`),
                            require(`../assets/imagesEvent/theme_3.jpg`),
                            require(`../assets/imagesEvent/theme_4.jpg`),
                            require(`../assets/imagesEvent/theme_5.jpg`),
                            require(`../assets/imagesEvent/theme_6.jpg`),
                            require(`../assets/imagesEvent/theme_7.jpg`),
                        ];
                        return (
                            <View style={styles.justify} key={categoryIndex}>
                                <Pressable onPress={() => gotTocategory(data)}>
                                    <ImageBackground
                                        source={imageSource[index]}
                                        style={styles.categorie}
                                    ></ImageBackground>
                                </Pressable>

                                <Text style={styles.textDescription}>
                                    {category}
                                </Text>
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
        );

        setactivityOptionsList(groupThemesCategories);
      } catch (error) {
        console.error("Error fetching events:", error.message);
      }
    };

    fetchAllEvents();
  }, []);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={(err) => console.error(err)}
      />
    );
  }

  function gohome(data) {
    //console.log(data.id);
    goRequestScreen(user.token, data.id);
    navigation.navigate("EventDetailScreen", {
      token: user.token,
      id: data.id,
    });
  }

  const catalogue = activityOptionsList.map((data, index) => {
    return (
      <View key={index}>
        <View style={styles.bannerTheme}>
          <Text style={styles.textTheme}>{data.theme}</Text>
        </View>

        <ScrollView horizontal={true} style={styles.themeContainer}>
          {data.categorie.map((category, categoryIndex) => {
            const imageSource = [
              require(`../assets/imagesEvent/theme_0.jpg`),
              require(`../assets/imagesEvent/theme_1.jpg`),
              require(`../assets/imagesEvent/theme_2.jpg`),
              require(`../assets/imagesEvent/theme_3.jpg`),
              require(`../assets/imagesEvent/theme_4.jpg`),
              require(`../assets/imagesEvent/theme_5.jpg`),
              require(`../assets/imagesEvent/theme_6.jpg`),
              require(`../assets/imagesEvent/theme_7.jpg`),
            ];
            return (
              <View style={styles.justify} key={categoryIndex}>
                <Pressable onPress={() => gohome(data)}>
                  <ImageBackground
                    source={imageSource[index]}
                    style={styles.categorie}
                  ></ImageBackground>
                </Pressable>

                <Text style={styles.textDescription}>{category}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  });

  const goSolutionScreen = () => {
    navigation.navigate("SolutionScreen");
  };

  const goBack = () => {
    navigation.navigate("TabNavigator");
  };

  const goRequestScreen = () => {
    navigation.navigate("RequestScreen");
  };
  const goDetailScreen = () => {
    navigation.navigate("EventDetailScreen");
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      <View style={styles.arrow}>
        <FontAwesome name="arrow-left" size={30} onPress={goBack} />
        <Text style={styles.h1}>Chercher un événement</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Pressable
          style={{ width: "100%", alignItems: "center" }}
          onPress={goDetailScreen}
        >
          <ImageBackground
            source={require("../assets/imagesEvent/event_main.jpg")}
            style={styles.mainEvent}
            imageStyle={{ borderRadius: 15 }}
          ></ImageBackground>
        </Pressable>

        <Text style={styles.h1}>Concert Blues</Text>
        <Text style={styles.textDescription}>06 Juin à 20H30</Text>

        <TouchableOpacity
          style={styles.buttonParticiper}
          onPress={goDetailScreen}
        >
          <Text style={styles.text}>Participer</Text>
        </TouchableOpacity>

        <ScrollView>{catalogue}</ScrollView>

        <TouchableOpacity style={styles.button} onPress={goSolutionScreen}>
          <Text style={styles.text}>J'ai pas trouvé...</Text>
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
    justifyContent: "stretch",
    paddingVertical: 20,
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
    marginVertical: 50,
  },

  buttonParticiper: {
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

  mainEvent: {
    borderRadius: 15,
    flex: 1,
    width: 340,
    height: 300,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 22,
  },

  textTheme: {
    fontSize: 20,
    letterSpacing: 0,
    lineHeight: 28,
    fontFamily: "ParkinsansMedium",
    color: "#fff",
    textAlign: "left",
  },

  bannerTheme: {
    backgroundColor: "#fdc731",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 22,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    marginVertical: 20,
  },

  categorie: {
    width: 200,
    height: 200,
    marginHorizontal: 10,
    flexDirection: "column",
    alignItems: "center",
  },

  themeContainer: {
    gap: 10,
  },

  textDescription: {
    color: "black",
    fontFamily: "NotoSansDisplayMedium",
    fontSize: 18,
    paddingTop: 10,
    textAlign: "center",
  },

  justify: {
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
    width: 210,
  },
});
