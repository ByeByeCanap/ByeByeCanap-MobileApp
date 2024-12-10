import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown';
import { RadioButton } from 'react-native-paper';

const themeOptions = [
  { label: 'Lecture', value: 'lecture' },
  { label: 'Musique', value: 'musique' },
  { label: 'Sport', value: 'sport' },
];

const categorieOptions = [
  { label: 'Culture', value: 'culture' },
  { label: 'Loisirs', value: 'loisirs' },
  { label: 'Voyages', value: 'voyages' },
];

export default function UserFormsPage2() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [theme, setTheme] = useState(null);
  const [categorie, setCategorie] = useState(null);
  const [checked, setChecked] = useState('');

  const loadFonts = async () => {
    await Font.loadAsync({
      ParkinsansMedium: require('./assets/fonts/ParkinsansMedium.ttf'),
      NotoSansDisplayLight: require('./assets/fonts/NotoSansDisplayLight.ttf'),
      NotoSansDisplayRegular: require('./assets/fonts/NotoSansDisplayRegular.ttf'),
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
        <Image style={styles.logoIcon} resizeMode="cover" source={require('./assets/logoIcon.png')} />
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.h1}>Centres d’intérêts</Text>

        <Text style={styles.h3}>Qu’est-ce que vous aimez faire pendant votre temps libre ?</Text>
        <Dropdown
          style={styles.dropdown}
          data={themeOptions}
          labelField="label"
          valueField="value"
          placeholder="Thèmes"
          value={theme}
          onChange={(item) => setTheme(item.value)}
        />

        <Dropdown
          style={styles.dropdown}
          data={categorieOptions}
          labelField="label"
          valueField="value"
          placeholder="Catégories"
          value={categorie}
          onChange={(item) => setCategorie(item.value)}
        />

        <Text style={styles.h3}>Qu’est-ce que vous savez bien faire et aimeriez partager ?</Text>
        <Dropdown
          style={styles.dropdown}
          data={themeOptions}
          labelField="label"
          valueField="value"
          placeholder="Thèmes"
          value={theme}
          onChange={(item) => setTheme(item.value)}
        />

        <Dropdown
          style={styles.dropdown}
          data={categorieOptions}
          labelField="label"
          valueField="value"
          placeholder="Catégories"
          value={categorie}
          onChange={(item) => setCategorie(item.value)}
        />

        <Text style={styles.h3}>Êtes-vous intéressé(e) par des activités d'engagement social ou de bénévolat ?</Text>
        <View style={styles.radioGroup}>
          <RadioButton.Group
            onValueChange={(newValue) => setChecked(newValue)}
            value={checked}
          >
            {['Oui', 'Non'].map((value) => (
              <View key={value} style={styles.radioItem}>
                <RadioButton value={value} color="#F3773B" />
                <Text style={styles.radioText}>{value}</Text>
              </View>
            ))}
          </RadioButton.Group>
        </View>

        <View style={styles.arrow}>
          <FontAwesome name="arrow-right" size={40} color="black" />
        </View>
      </ScrollView>

      <LinearGradient style={styles.footer} colors={['#fdc731', '#f3773b']} start={{ x: 0, y: 1 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { alignItems: 'center', padding: 20 },
  header: {
    width: '100%',
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 22,
  },
  logoIcon: { top: 20, width: 50, height: 50 },
  footer: { height: 100 },
  h1: {
    fontSize: 20,
    fontFamily: 'ParkinsansMedium',
    color: '#000',
    marginVertical: 50,
  },
  h3: {
    alignSelf: 'stretch',
    fontSize: 18,
    fontFamily: 'NotoSansDisplayRegular',
    color: '#000',
    paddingTop: 30,
  },
  dropdown: {
    width: '100%',
    height: 50,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#F3773B',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  radioText: {
    fontSize: 16,
    fontFamily: 'NotoSansDisplayLight',
    color: '#000',
  },
  arrow: {
    paddingTop: 10,
    paddingRight: 22,
    flexDirection: 'column',
    alignItems: 'flex-end',
    alignSelf: 'stretch',
  },
});
