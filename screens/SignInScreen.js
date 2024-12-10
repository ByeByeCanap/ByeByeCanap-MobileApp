// IMPORT pour react and state
import React, { useState } from 'react';
// Import concernant Redux persistor
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../reducers/users";
// Import pour navigation
// import { NavigationProp, ParamListBase } from '@react-navigation/native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Import pour icône
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
// Import pour style
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Platform, TextInput , Image} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';


export default function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [eyeStatus, setEyeStatus] = useState(false);
  let iconEyeName ='';


  const handleSignIn = () => {
    //console.log('Click is working'); //ok 
    fetch("http://10.127.234.79:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.result) {
          dispatch(login({ email: signInEmail, token: data.result.token }));
          setSignInEmail("");
          setSignInPassword("");
          console.log(user); //ok
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

        {/* <LinearGradient style={styles.header} colors={['#fdc731','#f3773b']} useAngle={true} angle={135} start={{ x: 0, y: 1 }}>
          <Image style={styles.logoIcon} resizeMode="cover" source={require('../assets/logoIcon.png')} />
        </LinearGradient> 
          */}

        {/* <View > */}
        <View style={styles.inputContainer}>
          {/* <View style={styles.arrow}>
            <FontAwesome name='arrow-left' size={30} />
        </View> */}
        <View style={styles.input}>
        <TextInput
            style={styles.textInput}
            placeholder={'Pseudo'}
            onChangeText={(value) => setSignInEmail(value)}
            value={signInEmail}
          />
          {/* {emailError && <Text style={styles.error}>Invalid email address</Text>} */}
        </View>

          <View style={styles.input}>
          <TextInput
            style={styles.textInput}
            placeholder={'Mot de Passe'}
            onChangeText={(value) => setSignInPassword(value)}
            value={signInPassword}
          />
          <FontAwesome name={iconEyeName} size={36} onPress={() => handleEyeIcon()}/>
          </View>
        </View>

        <TouchableOpacity onPress={() => handleSignIn()} style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>Sign-In</Text>
          </TouchableOpacity>
          {/* </View> */}

          {/* <LinearGradient style={styles.footer} colors={['#fdc731','#f3773b']} start={{ x: 0, y: 1 }}/> */}
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
    header: {
      width: "100%",
      height: 120,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingLeft: 22,
      backgroundColor: "transparent"
      },
    logoIcon: {
      top: 20,
      width: 50,
      height: 50
      },
    arrow: {
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 22,
      flexDirection: "column",
      alignItems: "flex-start",
      alignSelf: "stretch",
    },
    inputContainer:{
      width: 321,
      height: 130,
      gap: 50,
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
    },
    footer: {
      height: 100,
      alignSelf: 'stretch',
    },
  });
