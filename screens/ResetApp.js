import React from 'react'
import { Button, View, StyleSheet } from 'react-native';
import { persistor } from '../App';
import { useSelector } from "react-redux";

// solution 2
import AsyncStorage from '@react-native-async-storage/async-storage';

// solution 4
import { useDispatch } from "react-redux";
import { resetStore, reintializationStore, logout } from "../reducers/users";

const ResetApp = () => {
      // Only to check the status of the store ! correct implementation of useType for example and check that the rest is empty
      // A cause du PERSIST store, it is not empty !
const user = useSelector((state) => state.users.value);

// // SOLUTION 1 -----------------------------------------------------------------------------
//   console.log("Store Persist before rest",user);
//   const handleReset = async () => {
//     try {
//       await persistor.purge();
//       console.log('Store persistant réinitialisé.');
//       console.log("Store Persist AFTER rest",user);
//     } catch (error) {
//       console.error('Erreur lors de la réinitialisation :', error);
//     }
//   };


// // SOLUTION 2 -------------------------------------------------------------------------------
//   console.log("Store Persist before rest",user);
//   const clearPersistedStore = async () => {
//     try {
//       await AsyncStorage.clear(); // Vide toutes les données persistées
//       console.log('AsyncStorage vidé avec succès.');
//       console.log("Store Persist AFTER rest",user);
//     } catch (error) {
//       console.error('Erreur lors de la suppression d\'AsyncStorage :', error);
//     }
//   };


// // SOLUTION 3 --------------------------------------------------------------------------------
// const handleReset2 = () => {
//   persistStore(store).purge();
//   alert("Store reset successfully");
// };

// SOLUTION 4 --------------------------------------------------------------------------------
console.log("Store Persist BEFORE rest", user);

const dispatch = useDispatch();

 const handleReset3 = () =>  {
    dispatch(resetStore());
    dispatch(reintializationStore());
    dispatch(logout());
    console.log("Store Persist AFTER rest", user);
    };    

  return (
    <View style={styles.container}>
      <Button title="Réinitialiser l'application" onPress={handleReset3} />
    </View>
  );
};

export default ResetApp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        flexDirection: "column",
        justifyContent: "center",

    }
});