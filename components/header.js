import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute } from "@react-navigation/native";

const Material = MaterialCommunityIcons;

export default function Header() {
  const route = useRoute();
  const showIcons = [
    "Home",
    "Profile",
    "Map",
    "SearchEventScreen",
    "MenuScreen",
  ].includes(route.name);
  const navigation = useNavigation();
  const menuNavigation = () => navigation.navigate("MenuScreen");

  return (
    <LinearGradient
      colors={["#fdc731", "#f3773b"]}
      style={styles.header}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
    >
      <View style={styles.LeftSide}>
        <Image
          style={styles.LeftIcon}
          resizeMode="cover"
          source={require("../assets/logoIcon.png")}
        />
        {showIcons && <Material name="bell-outline" size={40} />}
      </View>
      <View style={styles.RightSide}>
        {showIcons && <FontAwesome name="search" size={30} />}
        {showIcons && (
          <Material name="menu" size={40} onPress={menuNavigation} />
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    borderWidth: 1,
    borderBottomColor: "#fdc731",
    height: 120,
    paddingTop: 40,
    flexDirection: "row",
  },
  LeftSide: {
    width: "50%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  LeftIcon: {
    width: 50,
    height: 50,
    marginLeft: 20,
    marginRight: 20,
  },
  RightSide: {
    width: "50%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 15,
    gap: 15,
  },
});
