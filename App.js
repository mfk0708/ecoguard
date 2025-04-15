import React, { useRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"
import Home from "./components/Home";
import Camera from "./components/Camera";
import Ionicons from '@expo/vector-icons/Ionicons';
import Settings from "./components/Setting";
import Alarm from "./components/Alarm";
import Event from "./components/Event";
import Assistant from "./components/Assistant";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); 


const CustomTabBar = ({ state, navigation }) => {
  const animations = useRef(state.routes.map(() => new Animated.Value(0))).current;

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        Animated.timing(animations[index], {
          toValue: isFocused ? -20 : 0, 
          duration: 300,
          useNativeDriver: true,
        }).start();

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
          >
            <Animated.View style={[styles.animatedIcon, { transform: [{ translateY: animations[index] }] }]}>
              <View style={[styles.iconWrapper, isFocused && styles.activeIcon]}>
                <Ionicons name={getIconName(route.name)} size={25} color="#fff" />
              </View>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const getIconName = (routeName) => {
  switch (routeName) {
    case "Home": return "home-outline";
    case "Camera": return "camera-outline";
    case "Alarm": return "headset-outline"; 
    case "Settings": return "settings-outline";
    default: return "circle-outline";
  }
};
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={Home} />
      <Stack.Screen name="Event" component={Event} />
      <Stack.Screen name="Assistant" component={Assistant} />

    </Stack.Navigator>
  );
}
const videoFeeds = [
"http://192.168.73.244:5000/video_feed",
"http://192.168.73.244:5000/video_feed",
  "https://www.w3schools.com/html/mov_bbb.mp4",
];
const App = () => (
  <NavigationContainer>
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeStack} options={{ tabBarLabel: "" }} />
      <Tab.Screen 
        name="Camera" 
        options={{ tabBarLabel: "" }}
      >
        {() => <Camera videoUrls={videoFeeds} />}
      </Tab.Screen>
      <Tab.Screen name="Alarm" component={Alarm} options={{ tabBarLabel: "" }} />
      <Tab.Screen name="Settings" component={Settings} options={{ tabBarLabel: "" }} />
    </Tab.Navigator>
    <StatusBar style="auto" />
  </NavigationContainer>
  
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#111",
    paddingVertical: 5,
    justifyContent: "space-around",
    alignItems: "center",
    
  },
  animatedIcon: {
    alignItems: "center",
  },
  iconWrapper: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  activeIcon: {
    backgroundColor: "#00abf0",
    borderRadius: 25,
  },
});

export default App;
