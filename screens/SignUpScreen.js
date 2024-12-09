import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// SignUpScreen Function
export default function SignUpScreen({ navigation }) {
  // Handling Previous and Next Pages for navigations
  const GoBack = () => navigation.navigate("UserTypeScreen");
  const GoNext = () => navigation.navigate("UserFormsScreen1");

  return (
    <View style={styles.container}>
      <View style={styles.arrow}>
        {/* Calls of the GoBack functions to navigate on UserTypeScreen */}
        <FontAwesome name="arrow-left" size={30} onPress={GoBack} />
      </View>
      <View>
        <View style={styles.UpZone}>
          <TouchableOpacity style={styles.GoogleButton}>
            {/* Google's Button (not fonctionnal for the moment) */}
            <FontAwesome name="google" size={20} color="white" />
            <Text style={styles.TextGoogleButton}>Connect with Google</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.separator}>OR</Text>
        <View style={styles.DownZone}>
          {/* Calls of the GoNext functions to navigate on UserFormsScreen1 */}
          <TouchableOpacity style={styles.EmailButton} onPress={GoNext}>
            <FontAwesome name="envelope" size={20} color="white" />
            <Text style={styles.TexteEmailButton}>Connect with email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// CSS Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  arrow: {
    position: "absolute",
    top: 40,
    left: 10,
  },
  UpZone: {
    marginBottom: 20,
  },
  GoogleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3773B",
    padding: 10,
    borderRadius: 20,
  },
  TextGoogleButton: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
  },
  separator: {
    marginVertical: 20,
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
  DownZone: {
    marginTop: 20,
  },
  EmailButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3773B",
    padding: 10,
    borderRadius: 20,
  },
  TexteEmailButton: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
  },
});
