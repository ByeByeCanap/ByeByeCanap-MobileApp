import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Modal,
} from "react-native";
import { Calendar } from "react-native-calendars";
import Header from "../components/header";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Animation from "../components/animation";
import { useSelector } from "react-redux";
import { activityOptions } from "../utils/userFormList";

export default function HomeScreen({ navigation }) {
  const [showAnimation, setShowAnimation] = useState(true); // État pour afficher l'animation
  const [isThemeModalVisible, setThemeModalVisible] = useState(false);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(null);

  // Animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 4000); // Animation de 4 secondes

    return () => clearTimeout(timer); // Stopper le timer
  }, []);

  // const user = useSelector((state) => state.users.value);
  // const store = () => {
  //   console.log("DATA DU STORE", "userType:", user);
  // };

  const goEvent = () => {
    navigation.navigate("CreateEventScreen");
  };

  const goSearcheEvent = () => {
    navigation.navigate("SearchEventScreen");
  };

  const toggleThemeModal = () => {
    setThemeModalVisible(!isThemeModalVisible);
  };

  const toggleCategoryModal = () => {
    setCategoryModalVisible(!isCategoryModalVisible);
  };

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    toggleThemeModal(); // Fermer le modal des thèmes
  };

  const filteredCategories =
    selectedTheme?.categorie ||
    activityOptions.flatMap((data) => data.categorie);

  const goToSearch = () => {
    navigation.navigate("SearchScreen");
    setCategoryModalVisible(!isCategoryModalVisible);
  };

  // Affiche l'animation au début
  if (showAnimation) {
    return <Animation duration={4000} />;
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.searchContainer}>
          <TouchableOpacity
            style={styles.buttonFilter}
            onPress={toggleThemeModal}
          >
            <Text style={styles.textFilter}>Thèmes</Text>
            <FontAwesome name="arrow-down" color="white"></FontAwesome>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonFilter}
            onPress={toggleCategoryModal}
          >
            <Text style={styles.textFilter}>Catégories</Text>
            <FontAwesome name="arrow-down" color="white"></FontAwesome>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Mon agenda</Text>
        <Calendar
          style={styles.calendar}
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#ffffff",
            textSectionTitleColor: "#f3773b",
            selectedDayBackgroundColor: "#f3773b",
            todayTextColor: "#fdc731",
            dayTextColor: "#2d4150",
            textDisabledColor: "#d9e1e8",
            arrowColor: "#f3773b",
            monthTextColor: "#f3773b",
          }}
        />

        <Text style={styles.sectionTitle}>Propositions de profils</Text>
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
              <View style={styles.avatar}>
                <Image
                  style={styles.avatarIcon}
                  resizeMode="cover"
                  source={require(`../assets/avatars/Avatar_1.png`)}
                />
              </View>
            )}
          />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.button} onPress={goEvent}>
            <Text style={styles.text}>Proposer un événement</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={goSearcheEvent}>
            <Text style={styles.text}>Chercher un événement</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal des Thèmes */}
      <Modal
        visible={isThemeModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleThemeModal}
      >
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            {activityOptions.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleThemeSelect(item)}
              >
                <Text style={styles.modalOptionText}>{item.theme}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.closeIcon} onPress={toggleThemeModal}>
            <FontAwesome style={styles.icon} name="close" size={30} />
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal des Catégories */}
      <Modal
        visible={isCategoryModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleCategoryModal}
      >
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            {filteredCategories.map((item, index) => (
              <Text
                key={index}
                style={styles.modalOptionText}
                onPress={goToSearch}
              >
                {item}
              </Text>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={toggleCategoryModal}
          >
            <FontAwesome style={styles.icon} size={30} name="close" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  logoIcon: {
    width: 50,
    height: 50,
  },

  avatarIcon: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderRadius: 50,
  },

  headerIcons: {
    flexDirection: "row",
    gap: 20,
  },
  scrollView: {
    marginTop: 20,
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 50,
  },

  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    marginVertical: 15,
  },

  buttonFilter: {
    backgroundColor: "#FDC731",
    flexDirection: "row",
    padding: 10,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    gap: 20,
    width: 150,
  },
  textFilter: {
    color: "white",
    fontFamily: "NotoSansDisplayRegular",
    fontSize: 18,
  },

  text: {
    color: "white",
    fontFamily: "ParkinsansMedium",
    fontSize: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontFamily: "ParkinsansMedium",
    color: "black",
    marginVertical: 10,
    marginBottom: 20,
  },
  calendar: {
    width: 330,
    marginBottom: 20,
  },
  avatarContainer: {
    flexDirection: "row",
    width: 350,
  },
  avatar: {
    marginHorizontal: 10,
  },

  button: {
    backgroundColor: "#F3773B",
    padding: 10,
    borderRadius: 19,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    width: 300,
    height: 50,
    paddingLeft: 20,
  },

  btnContainer: {
    marginTop: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "120%",
    gap: 20,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgb(253, 199, 49)",
    justifyContent: "center",
  },
  modalContent: {
    alignItems: "center",
    paddingVertical: 100,
  },
  modalOptionText: {
    fontFamily: "ParkinsansMedium",
    fontSize: 20,
    color: "black",
    marginVertical: 15,
  },
  closeIcon: {
    bottom: 50,
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "rgb(253, 199, 49)",
    paddingTop: 20,
  },

  icon: {
    borderWidth: 3,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 50,
  },
});
