import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Header from "../components/header";



// SignUpScreen Function
export default function SignUpScreen({ navigation }) {
  // Handling Previous and Next Pages for navigations
  const GoBack = () => navigation.navigate("UserTypeScreen");
  const GoNext = () => navigation.navigate("UserFormsScreen");
  const goToGoogleSignIn = () => navigation.navigate("GoogleSignInScreen")
  

  return (
    <View style={styles.container}>
      <Header/>

      <View style={styles.arrow}>
        {/* Calls of the GoBack functions to navigate on UserTypeScreen */}
        <FontAwesome name="arrow-left" size={30} onPress={GoBack} />
      </View>

      
      <View style={styles.btnContainer}>

          <TouchableOpacity style={styles.button} onPress={goToGoogleSignIn}>
            {/* Google's Button (not fonctionnal for the moment) */}
            <FontAwesome name="google" size={30} color="white" />
            <Text style={styles.textButton}>Connect with Google</Text>
          </TouchableOpacity>
       
          <Text style={styles.h2}>or</Text>

          {/* Calls of the GoNext functions to navigate on UserFormsScreen1 */}
          <TouchableOpacity style={styles.button} onPress={GoNext}>
            <FontAwesome name="envelope" size={30} color="white" />
            <Text style={styles.textButton}>Connect with email</Text>
          </TouchableOpacity>

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
    backgroundColor: 'white'
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

  arrow: {
    paddingTop: 20,
    paddingRight: 10,
    paddingLeft: 22,
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "stretch",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 274,
    gap: 50,
    bottom: 40,
  },

  btnContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 274,
    gap: 50,
    bottom: 40,
  },

  button: {
    backgroundColor: "#F3773B",
    padding: 10,
    borderRadius: 19,
    marginVertical: 10,
    flexDirection : 'row',
    alignItems: "center",
    gap : 20,
    width: 300,
    height: 50,
    paddingLeft: 20,
  },

  textButton:{
    color: 'white',
    fontFamily: 'ParkinsansMedium',
    fontSize: 20,
  },

  h2 : {
    fontFamily: 'ParkinsansMedium',
    fontSize: 20,
  },
});
