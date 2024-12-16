//import pour REDUX
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import users from "./reducers/users";

// importer les modules react-NAVIGATION
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";

// importer les COMPOSANTS
import SignScreen from "./screens/SignScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import UserFormsScreen from "./screens/UserFormsScreen";
import MapScreen from "./screens/MapScreen";
import AccountScreen from "./screens/AccountScreen";
import UserTypeScreen from "./screens/UserTypeScreen";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import ProfilScreen from "./screens/ProfilScreen";
import CreateEventScreen from "./screens/CreateEventScreen";
import SearchEventScreen from "./screens/SearchEventScreen";
import SolutionScreen from "./screens/SolutionScreen";
import RequestScreen from "./screens/RequestScreen";
import EventDetailScreen from "./screens/EventDetailScreen";

// Import pour icônes FONTAWESOME
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";

// Pour reset le store pendant le développement de l'appli uniquement !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import ResetApp from "./screens/ResetApp";


// REDUX
const reducers = combineReducers({ users });
const persistConfig = { key: "Bye Bye Canap'", storage: AsyncStorage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

// NAVIGATION
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Map") {
            iconName = "map-marker";
          } else if (route.name === "Profile") {
            iconName = "user-circle";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarBackground: () => (
          <LinearGradient colors={["#fdc731", "#f3773b"]} style={{ flex: 1 }} />
        ),

        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "black",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Profile" component={AccountScreen} />
    </Tab.Navigator>
  );
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SignScreen" component={SignScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="UserFormsScreen" component={UserFormsScreen} />
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="UserTypeScreen" component={UserTypeScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="AccountScreen" component={AccountScreen} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="ProfilScreen" component={ProfilScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="CreateEventScreen" component={CreateEventScreen}/>
            <Stack.Screen name="SearchEventScreen" component={SearchEventScreen}/>
            <Stack.Screen name="SolutionScreen" component={SolutionScreen} />
            <Stack.Screen name="RequestScreen" component={RequestScreen} />
            <Stack.Screen name="EventDetailScreen" component={EventDetailScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });