import { StyleSheet, View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/header";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function AccountScreen({ navigation }) {
  // const userButton = () => navigation.navigate(" ");
  const goMyProfil = () => navigation.navigate("ProfilScreen");

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Personnaliser</Text>
        <FontAwesome name="pencil" size={30} />
        {/* onPress={userButton} */}

        <Text style={styles.text}>Thème clair/sombre</Text>
        <FontAwesome name="moon-o" size={30} />
        <Text style={styles.text}>Compte</Text>
        <FontAwesome name="user" size={30} onPress={goMyProfil} />

        <Text style={styles.text}>Aide</Text>
        <FontAwesome name="question" size={30} />

        <Text style={styles.text}>Se déconnecter</Text>
        <FontAwesome name="sign-out" size={30} />
      </View>

      <LinearGradient
        style={styles.footer}
        colors={["#fdc731", "#f3773b"]}
        start={{ x: 0, y: 1 }}
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
  text: {
    fontWeight: "600",
    fontSize: 26,
  },
  textContainer: {},
});
