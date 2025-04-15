import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import WebView from "react-native-webview";

export default function Home({ navigation }) {
  const [videoError, setVideoError] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <FontAwesome5 name="fire" size={24} color="#1791b1" />
        <Text style={styles.text}>WELCOME BACK</Text>
      </View>

      <View style={styles.events}>
        <ImageBackground
          style={styles.background}
          source={require("./assets/background.jpg")}
          resizeMode="cover"
        >
          <Text style={styles.mainText}>EVENTS TRIGGERED TODAY: 0</Text>
        </ImageBackground>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.eventButton}>
          <TouchableOpacity
            style={styles.cam}
            onPress={() => navigation.navigate("Event")}
          >
            <Image source={require("./assets/aperture.png")} />
          </TouchableOpacity>
          <Text style={styles.eventText}>Events</Text>
        </View>

        <View style={styles.eventButton}>
          <TouchableOpacity style={styles.cam}>
            <Image source={require("./assets/battery.png")} />
          </TouchableOpacity>
          <Text style={styles.eventText}>Battery</Text>
        </View>

        <View style={styles.eventButton}>
          <TouchableOpacity
            style={styles.cam}
            onPress={() => navigation.navigate("Assistant")}
          >
            <Image source={require("./assets/info.png")} />
          </TouchableOpacity>
          <Text style={styles.eventText}>Assistant</Text>
        </View>
      </View>

      <View style={styles.videoText}>
        <View style={styles.innerText}>
          <FontAwesome name="camera" size={20} color={"#1791b1"} />
          <Text style={styles.text1}>Live Camera</Text>
        </View>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "baseline" }}
        >
          <Text style={styles.camText}>Change cam</Text>
          <AntDesign name="arrowright" size={10} color="#1791b1" />
        </TouchableOpacity>
      </View>

      <View style={styles.Video}>
        {videoError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>🚨 Video Unavailable</Text>
          </View>
        ) : (
          <WebView
            source={{ uri: "http://192.168.73.244:5000/video_feed" }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            cacheEnabled={true}
            useWebKit={true}
            allowsInlineMediaPlayback={true}
            onError={() => setVideoError(true)}
          />
        )}
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  heading: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "baseline",
    marginLeft: 20,
  },
  text: {
    color: "white",
    fontSize: 18,
    marginLeft: 5,
    fontWeight: "bold",
  },
  events: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  background: {
    height: 120,
    width: 320,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  mainText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  eventText: {
    color: "#1791b1",
    fontSize: 12,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginTop: 30,
  },
  eventButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  cam: {
    backgroundColor: "#242424",
    width: 65,
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  videoText: {
    marginTop: 40,
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginLeft: 20,
  },
  innerText: {
    flexDirection: "row",
    alignItems: "center",
  },
  camText: {
    fontSize: 12,
    color: "#1791b1",
  },
  text1: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
  },
  Video: {
    height: 180,
    width: "100%",
    backgroundColor: "grey",
    marginTop: 20,
  },
  errorContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  errorText: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
  },
});
