import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function HomeScreen( { navigation } ) {

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
        <FontAwesome name="bell" size={30} />
        <FontAwesome name="search" size={30} />
      </LinearGradient>


      <LinearGradient
        style={styles.footer}
        colors={["#fdc731", "#f3773b"]}
        start={{ x: 0, y: 1 }}
      />
    </View>
  )
    
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
  logoIcon: {
    top: 20,
    width: 50,
    height: 50,
  },
  footer: {
    height: 100,
    alignSelf: "stretch",
  },
});
