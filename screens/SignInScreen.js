// IMPORT pour react and state
import React, { useState } from 'react';
// Import concernant Redux persistor
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../reducers/users";
// Import pour navigation
import { NavigationProp, ParamListBase } from '@react-navigation/native';
// Import pour icône
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// Import pour style
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Platform, TextInput } from "react-native";


export default function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);

  const [SignInNickName, setSignInNickName] = useState("");
  const [SignInPassword, setSignInPassword] = useState("");
  const [eyeStatus, setEyeStatus] = useState(false);
  let iconEyeName ='';


  const handleSignIn = () => {
    console.log('Click is working'); //ok 
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
          console.log('fetch is working'); //ok          
        }
      });
  };

  if (user.token) {
    navigation.navigate('Home'); 
  }

  // icon Eye vs Eye slash
  if (eyeStatus) {
    iconEyeName = 'eye';
  } else {
    iconEyeName = 'eye-slash'; 
  }

  const handleEyeIcon = () => {
    setEyeStatus(!eyeStatus);
    console.log(eyeStatus);  
  }
  

  
  return (
<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>

      {/* <View style={styles.arrow}>
        <Icon name="arrow-back-outline" size={40} color="black" />
      </View> */}

        <View style={styles.inputContainer}>
        <View style={styles.input}>
        <TextInput
            style={styles.textInput}
            placeholder={'Pseudo'}
            onChangeText={(value) => setSignInNickName(value)}
            value={SignInNickName}
          />
          {/* {emailError && <Text style={styles.error}>Invalid email address</Text>} */}
        </View>

          <View style={styles.input}>
          <TextInput
            style={styles.textInput}
            placeholder={'Mot de Passe'}
            onChangeText={(value) => setSignInPassword(value)}
            value={SignInPassword}
          />
          <FontAwesome name={iconEyeName} size={36} onPress={() => handleEyeIcon()}/>
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
      backgroundColor: '#FFFFFF',
    },
    // arrow: {
    //   paddingTop: 10,
    //   paddingRight: 10,
    //   paddingBottom: 10,
    //   paddingLeft: 22,
    //   flexDirection: "column",
    //   alignItems: "flex-start",
    //   alignSelf: "stretch",
    // },
    inputContainer:{
      width: 321,
      height: 130,
    },
    input:{
      width: 320,
      height: 50,
      border: 'solid #F3773B 1px',
      borderRadius: 19,
      margin:10,
      paddingVertical: 20,
      paddingHorizontal: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textInput: {
      color: 'grey',
      minWidth: 72,
      height: 22,
      // backgroundColor: 'red',
    },
    button:{
      backgroundColor: '#F3773B',
      borderRadius: 19,
      width: 227,
      height: 48,
      marginTop:150,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textButton: {
      color: 'white',
    }
  });
