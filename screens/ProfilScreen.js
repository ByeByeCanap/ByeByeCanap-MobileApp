import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";

export default function ProfilScreen({ navigation }) {
  const GoBack = () => navigation.navigate("AccountScreen");
  const users = useSelector((state) => state.users.value);

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
        <FontAwesome name="bell" size={30} color="#fff" />
      </LinearGradient>

      <View style={styles.arrow}>
        <FontAwesome name="arrow-left" size={30} onPress={GoBack}/>
      </View>

      <ScrollView  contentContainerStyle={styles.content} >
        {/* User Info */}
        <View style={styles.userContainer}>
          <Image
            style={styles.avatar}
            resizeMode="cover"
            source={require("../assets/avatars/avatar_12.png")}
          />
          <Text style={styles.nameContainer}>
            {users.firstName}Thomas {users.lastName}Garcia
          </Text>
          <Text style={styles.nicknameContainer}>@{users.nickName}Draal</Text>
        </View>

        {/* tag d'intéressement */}
        <View style={styles.tagsContainer}>
          <Text style={styles.tag}>Activité 1</Text>
          <Text style={styles.tag}>Activité 2</Text>
          <Text style={styles.tag}>Centre d'intérêt 1</Text>
          <Text style={styles.tag}>Centre d'intérêt 2</Text>
          <Text style={styles.tag}>Centre d'intérêt 3</Text>
        </View>

        {/* Profile Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{users.description}</Text>
        </View>

        {/* Followers Section */}
        <View style={styles.avatarContainer}>
        <FlatList
          data={[
            { id: "1" },
            { id: "2" },
            { id: "3" },
            { id: "4" },
            { id: "5" },
          ]}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={() => (
            <View style={styles.avatarFake}>
              <Image
                style={styles.logoFake}
                resizeMode="cover"
                source={require("../assets/avatar1.png")}
              />
            </View>
          )}
        />
    </View>
        {/* Follow Button */}
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
      </ScrollView>
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
  },
  logoIcon: {
    width: 50,
    height: 50,
  },
  content: {
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  userContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  arrow: {
    paddingTop: 20,
    paddingRight: 10,
    paddingLeft: 22,
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "stretch",
  },
  avatar: {
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 100,
    width: 150,
    height: 150,
  },
  nameContainer: {
    fontFamily: 'ParkinsansMedium',
    fontSize: 24,
    marginTop: 10,
  },
  nicknameContainer: {
    fontSize: 14,
    fontFamily: 'NotoSansDisplayRegular',
    color: "gray",
    marginVertical: 5,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 5,
  },
  tag: {
    backgroundColor: "#fdc731",
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    margin: 5,
    fontSize: 16,
    fontFamily: 'NotoSansDisplayRegular',
  },
  descriptionContainer: {
    marginVertical: 25,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#fdc731",
    borderRadius: 10,
    width: "90%",
  },
  descriptionText: {
    textAlign: "center",
    fontSize: 15,
    color: "gray",
    padding: 10,
  },
  
  followButton: {
    backgroundColor: "#F3773B",
    width: 100,
    height: 50,
    borderRadius: 19,
    marginVertical: 25,
    flexDirection : 'row',
    alignItems: "center",
    justifyContent: "center",
   
  },
  followButtonText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: 'ParkinsansMedium'
  },
  avatarContainer: {
    flexDirection: "row",
    paddingVertical: 25,
  },
  avatarFake: {
    marginHorizontal: 10,
  },
  logoFake: {
    borderRadius: 120,
    borderWidth: 2,
    marginHorizontal: 10,
    width: 100,
    height: 100
  }
});
