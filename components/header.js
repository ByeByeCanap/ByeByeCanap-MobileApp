import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useRoute } from "@react-navigation/native";

const Material = MaterialCommunityIcons;

export default function Header() {
  const route = useRoute();
  const showIcons = ["Home", "Profile", "Map"].includes(route.name);

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
        {showIcons && <Material name="bell-outline" size={30} />}
      </View>
      <View style={styles.RightSide}>
        {showIcons && <FontAwesome name="search" size={30} />}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    borderWidth: 1,
    borderBottomColor: "white",
    height: 100,
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
    marginLeft: 10,
    marginRight: 20,
  },
  RightSide: {
    width: "50%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 15,
  },
});