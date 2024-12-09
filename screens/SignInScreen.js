// IMPORT pour react and state
import React, { useState } from 'react';
// Import concernant Redux persistor
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../reducers/users";
// Import pour navigation
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useRouter } from "next/router";
// Import pour icône
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import { faXmark } from "@fortawesome/free-solid-svg-icons";
// Import pour style
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";


export default function SignIn() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);

  const [SignInNickName, setSignInNickName] = useState("");
  const [SignInPassword, setSignInPassword] = useState("");

  const router = useRouter();

  const handleSignIn = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nickName: SignInNickName,
        password: SignInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ nickName: SignInNickName, token: data.token }));
          setSignInNickName("");
          setSignInPassword("");
        }
      });
  };

  if (user.token) {
    router.push("/home"); // push to quoi ?
  }

  return (
<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>

        <View style={styles.inputContainer}>
        <TextInput
            style={styles.textInput}
            placeholder={'Pseudo'}
            onChangeText={(value) => setSignInNickName(value)}
            value={SignInNickName}
          />
          {/* {emailError && <Text style={styles.error}>Invalid email address</Text>} */}

          <View>
          <TextInput
            style={styles.textInput}
            placeholder={'Mot de Passe'}
            onChangeText={(value) => setSignInPassword(value)}
            value={SignInPassword}
          />
          <FontAwesome name="faEyeSlash" size={25} color={flashStatus === "on" ? "#e8be4b" : "white"} />
          </View>
          


        </View>

        <TouchableOpacity onPress={() => handleSignIn()} style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>Sign-In</Text>
          </TouchableOpacity>

      </KeyboardAvoidingView>
    
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
