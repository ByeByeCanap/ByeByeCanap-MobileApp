import { StyleSheet, View, Button } from "react-native";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

export default function SignUpScreen() {
  const clientId = "";

  const [user, setUser] = useState(null);

  const handleLogin = (credentialResponse) => {
    setUser(jwtDecode(credentialResponse.credential));
  };
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <View style={styles.container}>
        <View style={styles.UpZone}>
          <GoogleLogin
            onSuccess={(credentialResponse) => handleLogin(credentialResponse)}
            onError={(error) => console.error(error)}
          />
          <Button>Connect with Facebook</Button>
        </View>
        <View style={styles.separator}>OR</View>
        <View style={styles.DownZone}>
          <Button>Connect with email</Button>
        </View>
      </View>
    </GoogleOAuthProvider>
  );
}

const styles = StyleSheet.create({});
