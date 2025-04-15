import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,TextInput, View, TouchableOpacity, Alert, Platform } from 'react-native';
import * as Location from 'expo-location';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { useState } from 'react';

export default function Assistant() {
  const [recording, setRecording] = useState(null);
  const [customMessage, setCustomMessage] = useState("");


  const TELEGRAM_BOT_TOKEN = "7795971674:AAHYrzf5pK6kJuNCzNw541d9dFgMFp_nvqw";
  const TELEGRAM_CHAT_ID = "873845935";

  const sendLocationToTelegram = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Enable location permissions to use SOS.');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    const message = `🚨 SOS Alert!\n📍 Latitude: ${latitude}\n📍 Longitude: ${longitude}\n🔗 [Google Maps](https://www.google.com/maps?q=${latitude},${longitude})`;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    if (response.ok) {
      Alert.alert("SOS Sent!", "Your location has been sent to Telegram.");
    } else {
      Alert.alert("Error", "Failed to send SOS message.");
    }
  };
  const sendMessageToTelegram = async (message) => {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    if (response.ok) {
      Alert.alert("Message Sent!", "Your message has been sent to Telegram.");
    } else {
      Alert.alert("Error", "Failed to send message.");
    }
  };

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission Denied", "Enable microphone permissions to use voice messages.");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
      Alert.alert("Recording Started", "Tap again to stop recording.");
    } catch (error) {
      console.error("Audio Recording Error:", error);
      Alert.alert("Error", "Failed to start recording.");
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);

      if (!uri) {
        Alert.alert("Error", "No audio file recorded.");
        return;
      }

      console.log("Recorded URI:", uri);

      if (Platform.OS === "web") {
        sendAudioToTelegramWeb(uri);
      } else {
        sendAudioToTelegramMobile(uri);
      }
    } catch (error) {
      console.error("Audio Stopping Error:", error);
      Alert.alert("Error", "Failed to stop recording.");
    }
  };

  const sendAudioToTelegramMobile = async (uri) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (!fileInfo.exists) {
        Alert.alert("Error", "Audio file not found.");
        return;
      }

      const formData = new FormData();
      formData.append("chat_id", TELEGRAM_CHAT_ID);
      formData.append("voice", {
        uri: uri,
        name: "voice.ogg",
        type: "audio/ogg",
      });

      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendVoice`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.ok) {
        Alert.alert("Voice Sent!", "Your voice message has been sent to Telegram.");
      } else {
        const errorData = await response.text();
        console.error("Telegram API Error:", errorData);
        Alert.alert("Error", "Failed to send voice message.");
      }
    } catch (error) {
      console.error("Audio Sending Error:", error);
      Alert.alert("Error", "Failed to send recorded audio.");
    }
  };

  const sendAudioToTelegramWeb = async (blobUrl) => {
    try {
      const response = await fetch(blobUrl);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append("chat_id", TELEGRAM_CHAT_ID);
      formData.append("voice", new File([blob], "voice.ogg", { type: "audio/ogg" }));

      const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendVoice`, {
        method: "POST",
        body: formData,
      });

      if (telegramResponse.ok) {
        Alert.alert("Voice Sent!", "Your voice message has been sent to Telegram.");
      } else {
        console.error("Telegram API Error:", await telegramResponse.text());
        Alert.alert("Error", "Failed to send voice message.");
      }
    } catch (error) {
      console.error("Audio Sending Error:", error);
      Alert.alert("Error", "Failed to send recorded audio.");
    }
  };
  

  return (
    
     <View style={styles.container}>
      
      <View style={styles.header}>
      <FontAwesome5 name="fire" size={24} color="#1791b1" />
        <Text style={styles.heading}>Assistant</Text>
      </View>

      <TouchableOpacity style={styles.sosButton} onPress={sendLocationToTelegram}>
        <Text style={styles.sosButtonText}>SOS</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.voiceButton} onPress={recording ? stopRecording : startRecording}>
        <Text style={styles.voiceButtonText}>{recording ? "Stop & Send" : "Record & Send"}</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Enter message..."
        placeholderTextColor="#ccc"
        value={customMessage}
        onChangeText={setCustomMessage}
      />
      <TouchableOpacity style={styles.sendButton} onPress={() => sendMessageToTelegram(customMessage)}>
        <Text style={styles.sendButtonText}>Send Message</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems:'center'
  },
  header: {
  marginTop: 40,
    flexDirection: "row",
    alignItems: "baseline",
    marginLeft: 20,
    alignSelf:'flex-start'
  
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    fontFamily: 'JockeyOne',
  },
  logo: {
    width: 50,
    height: 50,
  },
  sosButton: {
    backgroundColor: 'red',
    marginTop:80,
    width:'40%',
    height:50,
    alignItems:'center',
    justifyContent:'center'
  },
  sosButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'JockeyOne',
  },
  voiceButton: {
    backgroundColor: '#1E90FF',
    marginTop:50,
    width:'40%',
    height:50,
      alignItems:'center',
    justifyContent:'center'
  },
  voiceButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'JockeyOne',
  },
  sendButton:{
    backgroundColor:"#32CD32",
    marginTop:10
 
  },
  sendButtonText:{
    color:"#FFFFFF",
    fontSize: 20,
    fontWeight:'bold',
    fontFamily: 'JockeyOne',
  },
  input:{
    width:"60%",
    marginTop:80,
    borderWidth:1,
    borderColor:'white',
    height:100,
    color:'white'
    },
});
