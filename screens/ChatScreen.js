import { StyleSheet, View, Image } from "react-native";
import Header from "../components/header";
import FontAwesome from "react-native-vector-icons/FontAwesome";


export default function ChatScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Header/>
            <Image 
            style={styles.image}
            source={require('../assets/ChatGroupScreen.jpg')}/>
        </View>)

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#ffffff",
    },

    image: {
        width: "90%",
        height: "90%"
    }
})