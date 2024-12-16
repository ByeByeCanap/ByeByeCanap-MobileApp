import { StyleSheet, View, Text } from "react-native";
import Header from "../components/header";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function AccountScreen({ navigation }) {

    const goMyAccount = () => navigation.navigate('ProfilScreen')
  return (
    <View style={styles.container}>
          <Header navigation={navigation} />

          <View style={styles.textContainer}>

            <View style={styles.function}>
            <Text style={styles.text}>Mon Profil</Text>
            <FontAwesome name="user" size={30} onPress={goMyAccount}/>
            </View>
          
            <View style={styles.function}>
            <Text style={styles.text}>Mes préférences</Text>
            <FontAwesome name="star" size={30} />
            </View>

            <View style={styles.function}>
            <Text style={styles.text}>Chat groupe</Text>
            <FontAwesome name="wechat" size={30} />
            </View>

            <View style={styles.function}>
            <Text style={styles.text}>Se Déconnecter</Text>
            <FontAwesome name="sign-out" size={30} />
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
});