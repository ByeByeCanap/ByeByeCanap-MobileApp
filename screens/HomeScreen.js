import React, { useState } from "react";
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

export default function HomeScreen({ navigation }) {
  const [isThemeModalVisible, setThemeModalVisible] = useState(false);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(null);

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
    toggleThemeModal(); // Fermeture du modal des thèmes
  };

  const filteredCategories =
    selectedTheme?.categorie ||
    activityOptions.flatMap((data) => data.categorie);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.buttonFilter} onPress={toggleThemeModal}>
            <Text style={styles.textFilter}>Thèmes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonFilter} onPress={toggleCategoryModal}>
            <Text style={styles.textFilter}>Catégories</Text>
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

        <Text style={styles.sectionTitle}>Proposition de profils</Text>
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
                  source={require("../assets/avatar1.png")}
                />
              </View>
            )}
          />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.button} onPress={goEvent}>
            <Text style={styles.text}>Proposer un événement</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={goSearcheEvent}
          >
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
              <Text key={index} style={styles.modalOptionText}>
                {item}
              </Text>
            ))}
          </ScrollView>
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
    padding: 10,
    borderRadius: 19,
    alignItems: "center",
    width: 120,
  },
  textFilter: {
    color: "white",
    fontFamily: 'NotoSansDisplayRegular',
    fontSize: 16,
  },

  text: {
    color: "white",
    fontFamily: 'ParkinsansMedium',
    fontSize: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontFamily: 'ParkinsansMedium',
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
    flexDirection : 'row',
    alignItems: "center",
    justifyContent: "center",
    gap : 20,
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
    backgroundColor: "rgba(253, 199, 49, 0.9)",
    justifyContent: "center",
  },
  modalContent: {
    alignItems: "center",
    paddingVertical: 50,
  },
  modalOptionText: {
    fontSize: 18,
    color: "#333",
    marginVertical: 15,
  },
});
