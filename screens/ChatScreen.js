import { StyleSheet, View, Image, TouchableWithoutFeedback } from "react-native";

export default function ChatScreen({ navigation }) {

    const goBack = () => navigation.navigate('MenuScreen')
    return (
        <View style={styles.container}>
        <TouchableWithoutFeedback  onPress={goBack}>
            <Image 
            style={styles.image}
            source={require('../assets/ChatScreen.jpg')}/>
        </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
    },

    image: {
        flex: 1,
        width: "100%",
        height: "100%",
        zIndex: 1,
    }
})