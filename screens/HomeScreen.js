import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Calendar } from "react-native-calendars";

export default function HomeScreen({ navigation }) {

  const [profiles, setProfiles] = useState([
    { id: "1", name: "User 1" },
    { id: "2", name: "User 2" },
    { id: "3", name: "User 3" },
    { id: "4", name: "User 4" },
    {id: "5", name: "User 5"},
  ]);

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
        <View style={styles.headerIcons}>
          <FontAwesome name="bell" size={30} color="#fff" />
          <FontAwesome name="search" size={30} color="#fff" />
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

        <View style={styles.buttonSearch}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Thèmes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Catégories</Text>
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
          markedDates={{
            "2024-12-11": { selected: true, marked: true, selectedColor: "#f3773b" },
          }}
        />

        <Text style={styles.sectionTitle}>Proposition de profils</Text>
        <View style={styles.avatarContainer}>
          <FlatList
            data={profiles}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.avatar}>
                <FontAwesome name="user-circle" size={50} color="#f3773b" />
                <Text style={styles.avatarName}>{item.name}</Text>
              </View>
            )}
          />
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.text}>Proposer un événement</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.text}>Chercher un événement</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <LinearGradient
        style={styles.footer}
        colors={["#fdc731", "#f3773b"]}
        start={{ x: 0, y: 1 }}
        onPress={handleTabNavigate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    width: "100%",
    height: 120,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: "transparent",
  },
  logoIcon: {
    width: 50,
    height: 50,
  },
  headerIcons: {
    flexDirection: "row",
    gap: 20,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 50, 
  },
  buttonSearch: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    marginVertical: 15,
  },
  button: {
    backgroundColor: "#FDC731",
    padding: 10,
    borderRadius: 19,
    alignItems: "center",
    width: 120,
  },
  text: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
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
  avatarName: {
    fontSize: 12,
    color: "#333",
    marginTop: 5,
    alignSelf: "center"
  },
  actionButtons: {
    marginVertical: 20,
    width: "90%",
  },
  actionButton: {
    backgroundColor: "#f3773b",
    padding: 10,
    borderRadius: 19,
    marginVertical: 10,
    alignItems: "center",
  },
  footer: {
    height: 100,
    alignSelf: "stretch",
  },
});
