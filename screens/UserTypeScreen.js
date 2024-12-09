import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function SignScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.arrow}>
        <Icon name="arrow-back-outline" size={40} color="black" />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Particulier</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Professionnel</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Association</Text>
      </TouchableOpacity>

      <View style={styles.footer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#F3773B",
    padding: 10,
    borderRadius: 19,
    marginVertical: 10,
    alignItems: "center",
    width: 227,
    height: 48,
  },
  text: {
    color: "white",
    fontFamily: "Parkinsans-Medium",
    fontWeight: "300",
    fontSize: 20,
  },
  arrow: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 22,
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "stretch",
  },

  footer: {
    height: 55,
    alignSelf: "stretch",
    backgroundColor: "yellow",
  },
});
