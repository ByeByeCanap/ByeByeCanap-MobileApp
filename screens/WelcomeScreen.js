import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Image } from "react-native";

export default function WelcomeScreen( { navigation } ) {

    const goNext = () => {
        navigation.navigate('SignScreen')
    }

    return (
        <TouchableWithoutFeedback onPress={goNext} style={styles.container}>
            <Image 
                style={styles.image}
                source={require('../assets/HomePageScreen.jpg')}
            />
        </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },

    image: {
        width: "100%",
        height: "100%",
    }
});