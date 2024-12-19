import { StyleSheet, View, Text } from "react-native";
import Header from "../components/header";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/users";

export default function AccountScreen({ navigation }) {

  const dispatch = useDispatch();



  const goToSettings = () => navigation.navigate('SettingScreen');
  const goToChatScreen = () => navigation.navigate('ChatScreen');
  const handleLogout = () => {
    dispatch(logout())
    console.log('Message pour la pétasse',dispatch(logout()))
    navigation.navigate('SignScreen');
  };
  const goToFavoriteScreen = () => navigation.navigate('FavoriteScreen');


  return (
    <View style={styles.container}>
          <Header navigation={navigation} />

          <View style={styles.textContainer}>
          
            <View style={styles.function}>
            <Text style={styles.text}>Mes paramètres</Text>
            <FontAwesome name="gear" size={30} onPress={goToSettings}/>
            </View>

            <View style={styles.function}>
            <Text style={styles.text}>Favoris</Text>
            <FontAwesome name="star" size={30} onPress={goToFavoriteScreen}/>
            </View>

            <View style={styles.function}>
            <Text style={styles.text}>Chat groupe</Text>
            <FontAwesome name="wechat" size={30} onPress={goToChatScreen}/>
            </View>

            <View style={styles.function}>
            <Text style={styles.text}>Se Déconnecter</Text>
            <FontAwesome name="sign-out" size={30} onPress={handleLogout}/>
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
