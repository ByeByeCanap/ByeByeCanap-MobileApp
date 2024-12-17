import { StyleSheet, View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/header";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function SettingScreen({ navigation }) {

  const goBack = () => navigation.navigate("MenuScreen");

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      <View style={styles.arrow}>
        <FontAwesome name="arrow-left" size={30} onPress={goBack}/>
      </View>

          <View style={styles.textContainer}>

            <View style={styles.function}>
            <Text style={styles.text}>Personnaliser</Text>
            <FontAwesome name="pencil" size={30} />
            </View>
            {/* onPress={userButton} */}
          
            <View style={styles.function}>
            <Text style={styles.text}>Thème clair/sombre</Text>
            <FontAwesome name="moon-o" size={30} />
            </View>

            <View style={styles.function}>
            <Text style={styles.text}>Aide</Text>
            <FontAwesome name="question" size={30} />
            </View>
          </View>
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
    fontFamily: 'NotoSansDisplayRegular',
    fontSize: 18,
  },

  textContainer: {
    padding: 30,
  },

  function:{
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent:'space-between',
    alignItems: "center",
  },

  arrow: {
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 22,
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "stretch",
  },
});
