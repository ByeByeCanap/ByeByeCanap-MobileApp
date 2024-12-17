import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/users";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BACK_IP } from "@env";
import { Header } from "../components/header";

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);
  const goBack = () => {
    navigation.navigate("SignScreen");
    console.log(BACK_IP);
  };
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [eyeStatus, setEyeStatus] = useState(false);
  let iconEyeName = "";

  const handleSignIn = () => {
    //console.log('Click is working'); //ok
    fetch(`${BACK_IP}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          dispatch(login({ email: signInEmail, token: data.result.token }));
          setSignInEmail("");
          setSignInPassword("");
          navigation.navigate("HomeScreen");
          console.log(user); //ok
        }
      });
  };

  // icon Eye vs Eye slash
  if (eyeStatus) {
    iconEyeName = "eye";
  } else {
    iconEyeName = "eye-slash";
  }

  const handleEyeIcon = () => {
    setEyeStatus(!eyeStatus);
    console.log(eyeStatus);
  };

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
      </LinearGradient>

      <View style={styles.arrow}>
          <FontAwesome name="arrow-left" size={30} onPress={goBack} />
      </View>

      <View style={styles.h1content}>
        <Text style={styles.h1}>Heureux de vous revoir !</Text>
      </View>

      <View style={styles.inputContainer}>

        <View style={styles.input}>
          <TextInput
            autoCapitalize="none" // https://reactnative.dev/docs/textinput#autocapitalize
            keyboardType="email-address" // https://reactnative.dev/docs/textinput#keyboardtype
            textContentType="emailAddress" // https://reactnative.dev/docs/textinput#textcontenttype-ios
            autoComplete="email" // https://reactnative.dev/docs/textinput#autocomplete-android
            style={styles.textInput}
            placeholder={"Email"}
            onChangeText={(value) => setSignInEmail(value)}
            value={signInEmail}
          />
          {/* {emailError && <Text style={styles.error}>Invalid email address</Text>} */}
        </View>

        <View style={styles.input}>
          <TextInput
            style={styles.textInput}
            placeholder="Mot de Passe"
            secureTextEntry={!eyeStatus} // Cache le mot de passe si eyeStatus est false
            onChangeText={(value) => setSignInPassword(value)}
            value={signInPassword}
          />
          <TouchableOpacity
            onPress={handleEyeIcon}
            style={styles.eyeIconContainer}
          >
            <FontAwesome name={iconEyeName} size={35} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => handleSignIn()}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Sign-In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white',
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

  button: {
    backgroundColor: "#F3773B",
    padding: 10,
    borderRadius: 19,
    marginVertical: 10,
    alignItems: "center",
    width: 227,
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

  logoIcon: {
    top: 20,
    width: 50,
    height: 50,
  },

  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  btnContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 274,
    gap: 50,
    bottom: 40,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    width: 300,
    height: 50,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#F3773B",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    marginVertical: 10,
  },

  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#282828",
    fontFamily: "NotoSansDisplayLight",
    fontWeight: "300",
  },
  eyeIconContainer: {
    padding: 5,
  },

  textButton: {
    fontFamily: "ParkinsansMedium",
    fontSize: 20,
    color: 'white'
  },

  h1content : {
    marginVertical: 50,
  },

  h1:{
    width: 350,
    fontFamily: 'ParkinsansMedium',
    fontSize: 22,
    textAlign: 'center',
  },
});
