import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function UserFormsPage1() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [manualDate, setManualDate] = useState(date.toLocaleDateString('fr-FR'));
  const [checked, setChecked] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const loadFonts = async () => {
    await Font.loadAsync({
      ParkinsansMedium: require('./assets/fonts/ParkinsansMedium.ttf'),
      NotoSansDisplayLight: require('./assets/fonts/NotoSansDisplayLight.ttf'),
      NotoSansDisplayRegular: require('./assets/fonts/NotoSansDisplayRegular.ttf'),
    });
  };

  const onChangeDate = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      setManualDate(selectedDate.toLocaleDateString('fr-FR'));
    }
    setShowPicker(false);
  };

  const handleManualDateChange = (text) => {
    setManualDate(text);
    const parsedDate = new Date(text.split('/').reverse().join('-'));
    if (!isNaN(parsedDate)) {
      setDate(parsedDate);
    }
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
        <Text style={styles.h1}>Identité et généralités</Text>

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Nom"
          placeholderTextColor="#A9A9A9"
        />
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Prénom"
          placeholderTextColor="#A9A9A9"
        />
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
          placeholder="Nom d'utilisateur"
          placeholderTextColor="#A9A9A9"
        />

        <View style={styles.datePickerContainer}>
          <TextInput
            style={styles.dateInput}
            value={manualDate}
            placeholder="Date de naissance"
            placeholderTextColor="#A9A9A9"
            onChangeText={handleManualDateChange}
          />
          <TouchableOpacity onPress={() => setShowPicker(true)}>
            <FontAwesome name="calendar" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="calendar"
            onChange={onChangeDate}
          />
        )}

<View style={styles.radioGroup}>
  {['Homme', 'Femme', 'Autre'].map((value) => (
    <View key={value} style={styles.radioItem}>
      <RadioButton.Group
        value={value}
        status={checked === value ? 'checked' : 'unchecked'}
        onPress={() => setChecked(value)}
        uncheckedColor="#F3773B" // Couleur de l'icône non sélectionnée
        color="#F3773B"           // Couleur de l'icône sélectionnée
      />
      <Text style={styles.radioText}>{value}</Text>
    </View>
  ))}
</View>


        <View style={styles.passwordInput}>
          <TextInput
            style={styles.inputFlex}
            value={password}
            onChangeText={setPassword}
            placeholder="Mot de passe"
            placeholderTextColor="#A9A9A9"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome name={showPassword ? 'eye' : 'eye-slash'} size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordInput}>
          <TextInput
            style={styles.inputFlex}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirmer mot de passe"
            placeholderTextColor="#A9A9A9"
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <FontAwesome name={showConfirmPassword ? 'eye' : 'eye-slash'} size={24} color="#000" />
          </TouchableOpacity>
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
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    padding: 20,
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
    logoIcon: {
    top: 20,
    width: 50,
    height: 50,
  },
  footer: {
    height: 100,
  },
  h1: {
    fontSize: 20,
    fontFamily: 'ParkinsansMedium',
    color: '#000',
    marginVertical: 50,
  },
  input: {
    width: 300,
    height: 50,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#F3773B',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
    color: '#282828',
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    height: 50,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#F3773B',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  dateInput: {
    flex: 1,
    fontSize: 16,
    color: '#282828',
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
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    height: 50,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#F3773B',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  inputFlex: {
    flex: 1,
    fontSize: 16,
    color: '#282828',
  },

  arrow : {
    paddingTop: 10,
    paddingRight: 22,
    paddingBottom: 10,
    paddingLeft: 10,
    flexDirection: 'column',
    alignItems: 'flex-end',
    alignSelf: 'stretch',
  }
});
