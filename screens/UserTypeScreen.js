import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function UserTypeScreen() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      ParkinsansMedium: require('../assets/fonts/ParkinsansMedium.ttf'),
      NotoSansDisplayLight: require('../assets/fonts/NotoSansDisplayLight.ttf'),
      NotoSansDisplayRegular: require('../assets/fonts/NotoSansDisplayRegular.ttf'),
    });
  };

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={(err) => console.error(err)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient style={styles.header} colors={['#fdc731', '#f3773b']} start={{ x: 0, y: 1 }}>
        <Image style={styles.logoIcon} resizeMode="cover" source={require('../assets/logoIcon.png')} />
      </LinearGradient>

      <View style={styles.arrow}>
        <FontAwesome name="arrow-left" size={40} color="black" />
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Particulier</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Professionnel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Association</Text>
        </TouchableOpacity>
      </View>

      <LinearGradient style={styles.footer} colors={['#fdc731', '#f3773b']} start={{ x: 0, y: 1 }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 22,
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: '#F3773B',
    paddingTop: 10,
    borderRadius: 19,
    marginVertical: 10,
    alignItems: 'center',
    width: 227,
    height: 50,
  },
  text: {
    color: 'white',
    fontFamily: 'ParkinsansMedium',
    fontSize: 20,
  },
  arrow: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 22,
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
  footer: {
    height: 100,
    alignSelf: 'stretch',
  },
  logoIcon: {
    top: 20,
    width: 50,
    height: 50,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 274,
    gap: 50,
    bottom: 40,
  },
});
