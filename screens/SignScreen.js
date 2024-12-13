import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Header from "../components/header";

export default function SignScreen({ navigation }) {
  const signUp = () => navigation.navigate("UserTypeScreen");
  const signIn = () => navigation.navigate("SignInScreen");

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.btnContainer}>
        <Text>Pas encore membre ?</Text>
        <TouchableOpacity style={styles.button} onPress={signUp}>
          <Text style={styles.text}>Sign-Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnContainer}>
        <Text>Déjà un compte ?</Text>
        <TouchableOpacity style={styles.button} onPress={signIn}>
          <Text style={styles.text}>Sign-In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

  button: {
    backgroundColor: "#F3773B",
    padding: 10,
    borderRadius: 19,
    marginVertical: 10,
    alignItems: "center",
    width: 227,
    height: 50,
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

  logoIcon: {
    top: 20,
    width: 50,
    height: 50,
  },

  btnContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 274,
    gap: 50,
    bottom: 40,
  },
});
