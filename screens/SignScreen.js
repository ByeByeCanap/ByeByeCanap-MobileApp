import { StyleSheet, View, Text, Button } from 'react-native';

export default function SignScreen() {

  return (
    <View>
      <View styles={styles.signUp}>
        <Text>Pas encore membre ?</Text>
        <Button styles={styles.button}>Sign-Up</Button>
      </View>
      <View styles={styles.signIn}>
        <Text>Déjà un compte ?</Text>
        <Button styles={styles.button}>Sign-In</Button>
      </View>
    </View>
  )
    
}

const styles = StyleSheet.create({
  signUp: {
    fontFamily: "parkinsans",
    fontWeight: "medium",
    fontSize: 20,
    textAlign: "center",
    justifyContent: "center",
    width: 227, 
    height: 106,
  },
  signIn: {
    fontFamily: "parkinsans",
    fontWeight: "medium",
    fontSize: 20,
    textAlign: "center",
    justifyContent: "center",
    width: 227, 
    height: 106,
  },

  button: {
    color: '#f3773b',
    borderRadius: 19,
    width: 227,
    height: 48,
  }
});