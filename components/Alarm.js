import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { io } from "socket.io-client";
import axios from "axios";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const SERVER_URL = "http://192.168.73.244:5000/alarm";
const SOCKET_URL = "ws://192.168.73.244:5000/alarm";

export default function App() {
  const [alarmStatus, setAlarmStatus] = useState("off");

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on("alarm", (data) => {
      if (data.status === "on") {
        setAlarmStatus("on");
        alert("🚨 Elephant Detected! Alarm ON!");
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  const toggleAlarm = async (status) => {
    try {
      await axios.post(`${SERVER_URL}/alarm`, { status });
      setAlarmStatus(status);
    } catch (error) {
      console.error("Error setting alarm:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <FontAwesome5 name="fire" size={24} color="#1791b1" />
        <Text style={{ color: "white", fontSize: 18,marginLeft:8,fontWeight:'bold'}}>ALARM</Text>
      </View>

      <Text style={styles.status}>Alarm: {alarmStatus.toUpperCase()}</Text>
<View style={styles.buttons}>
      <Button
        title="Turn Alarm ON"
        onPress={() => toggleAlarm("on")}
        color="red"
        
      />
      <Button
        title="Turn Alarm OFF"
        onPress={() => toggleAlarm("off")}
        color="green"
      />
      </View>
      <WebView source={{ uri: `${SERVER_URL}/video_feed` }} style={styles.webview} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
  },
  heading: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    alignSelf: "flex-start",
  },
  status: { 
    fontSize: 18, 
    marginVertical: 10, 
    color: "white",
  marginTop:'80' },
  buttons: {
    flexDirection: "row",
    gap: 10,  
    marginTop: 10,  
  },
  webview: {
    width: "100%",
    height: 200,
    marginTop: 10, 
    flexGrow: 1,   
  },
});

