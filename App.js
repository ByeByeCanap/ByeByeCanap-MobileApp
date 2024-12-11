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
import UserFormsScreen1 from "./screens/UserFormsScreen1";
import UserFormsScreen2 from "./screens/UserFormsScreen2";
import UserFormsScreen3 from "./screens/UserFormsScreen3";
import UserFormsScreen4 from "./screens/UserFormsScreen4";
import UserFormsScreen5 from "./screens/UserFormsScreen5";
import UserFormsScreen6 from "./screens/UserFormsScreen6";
import UserFormsScreen7 from "./screens/UserFormsScreen7";
import MapScreen from "./screens/MapScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserTypeScreen from "./screens/UserTypeScreen";
import HomeScreen from "./screens/HomeScreen";

// Import pour icônes FONTAWESOME
import FontAwesome from "react-native-vector-icons/FontAwesome";

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
            iconName = "house";
          } else if (route.name === "Map") {
            iconName = "map";
          } else if (route.name === "Profile") {
            iconName = "user";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "grey",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
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
            <Stack.Screen
              name="UserFormsScreen1"
              component={UserFormsScreen1}
            />
            <Stack.Screen
              name="UserFormsScreen2"
              component={UserFormsScreen2}
            />
            <Stack.Screen
              name="UserFormsScreen3"
              component={UserFormsScreen3}
            />
            <Stack.Screen
              name="UserFormsScreen4"
              component={UserFormsScreen4}
            />
            <Stack.Screen
              name="UserFormsScreen5"
              component={UserFormsScreen5}
            />
            <Stack.Screen
              name="UserFormsScreen6"
              component={UserFormsScreen6}
            />
            <Stack.Screen
              name="UserFormsScreen7"
              component={UserFormsScreen7}
            />
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="UserTypeScreen" component={UserTypeScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
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
