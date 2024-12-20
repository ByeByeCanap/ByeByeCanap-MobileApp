import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import { BACK_IP } from "../env";
import { useState, useEffect } from "react";
import { avatarsMap } from "../utils/avatars";
import Header from "../components/header";


export default function ProfilScreen({ navigation }) {
  const users = useSelector((state) => state.users.value);

  console.log(users.token);

  const [description, setDescription] = useState("");
  const [interestTheme, setInterestTheme] = useState([]);
  const [interestCategorie, setInterestCategorie] = useState([]);
  const [skillTheme, setSkillTheme] = useState([]);
  const [skillCategorie, setSkillCategorie] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNickName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    fetch(`${BACK_IP}/users/${users.token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDescription(data.descriptionProfile);
        setInterestTheme(data.aspirations.themesInterest || []);
        setInterestCategorie(data.aspirations.categoriesInterest || []);
        setSkillTheme(data.aspirations.themesSkill || []);
        setSkillCategorie(data.aspirations.categoriesSkill || []);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setNickName(data.nickName);
        setAvatar(data.avatar);
      })
      .catch((error) =>
        console.error("T'as encore fait une erreur pétasse:", error)
      );
  }, []);

  const imageSource = avatarsMap[avatar];;

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      <ScrollView contentContainerStyle={styles.content}>
        {/* User Info */}
        <View style={styles.userContainer}>
          
          <Image
            style={styles.avatar}
            resizeMode="cover"
            source={imageSource}
          />
          <Text style={styles.nameContainer}>
            <Text>
              {firstName} {lastName}
            </Text>
          </Text>
          <Text style={styles.nicknameContainer}>@{nickName}</Text>
        </View>

        {/* tag d'intéressement fetch vers infos user*/}
        <View style={styles.tagsContainer}>
          <Text style={styles.tag}>{interestTheme}</Text>
          <Text style={styles.tag}>{interestCategorie}</Text>
          <Text style={styles.tag}>{skillTheme}</Text>
          <Text style={styles.tag}>{skillCategorie}</Text>
        </View>

        {/* Profile Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>

        <Text style={styles.h2}>Followers</Text>
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
  content: {
    top: 10,
    justifyContent: "center",
    alignItems: "center",
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
    fontFamily: "ParkinsansMedium",
    fontSize: 24,
    marginTop: 10,
  },
  nicknameContainer: {
    fontSize: 14,
    fontFamily: "NotoSansDisplayRegular",
    color: "gray",
    marginVertical: 5,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  tag: {
    backgroundColor: "#fdc731",
    color: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    margin: 5,
    fontSize: 16,
    fontFamily: "NotoSansDisplayRegular",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  followButtonText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "ParkinsansMedium",
  },
  avatarContainer: {
    flexDirection: "row",
    paddingVertical: 10,
  },

  logoFake: {
    borderRadius: 120,
    borderWidth: 2,
    marginHorizontal: 10,
    width: 100,
    height: 100,
  },

  h2: {
    fontFamily: "ParkinsansMedium",
    fontSize: 20,
    marginHorizontal: 15,
  },
});
