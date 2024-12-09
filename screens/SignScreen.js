import { StyleSheet, View, Text, Button } from 'react-native';

export default function SignScreen() {

  return (
    <View>
      <View>
        <Text>Pas encore membre ?</Text>
        <Button>Sign-Up</Button>
      </View>
      <View>
        <Text>Déjà un compte ?</Text>
        <Button>Sign-In</Button>
      </View>
    </View>
  )
    
}

const styles = StyleSheet.create({
  
});
