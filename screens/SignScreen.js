import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';


export default function SignScreen( { navigation } ) {
  const signUp = () => navigation.navigate('SignUpScreen');
  const signIn = () => navigation.navigate('SignInScreen');

  return (
    <View style={styles.container}>
      <View style={styles.signUp}>
        <Text>Pas encore membre ?</Text>
        <TouchableOpacity style={styles.button} onPress={signUp}>
          <Text style={styles.buttonText}>Sign-Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signIn}>
        <Text>Déjà un compte ?</Text>
        <TouchableOpacity style={styles.button} onPress={signIn}>
          <Text style={styles.buttonText}>Sign-In</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  signUp: {
    marginBottom: 20,
    alignItems: "center",
  },
  signIn: {
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#f3773b",
    borderRadius: 19,
    width: 227,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});