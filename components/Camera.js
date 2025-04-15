import React, { useState, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { ResizeMode } from "expo-av";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import WebView from "react-native-webview";

export default function Camera({ videoUrls }) {
  const { width } = Dimensions.get("window");
  const videoWidth = width * 0.9;
  const videoHeight = videoWidth * 0.5625;

  const [availability, setAvailability] = useState(new Array(videoUrls.length).fill(null));
  const videoRefs = useRef({});

  useEffect(() => {
    const checkVideos = async () => {
      const availabilityStatus = await Promise.all(
        videoUrls.map(async (url) => {
          try {
            const response = await fetch(url, { method: "HEAD" });
            return response.ok;
          } catch {
            return false;
          }
        })
      );
      setAvailability(availabilityStatus);
    };

    checkVideos();
  }, [videoUrls]);

  const stopVideo = (index) => {
    if (videoRefs.current[index]) {
      videoRefs.current[index].pauseAsync();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome5 name="fire" size={24} color="#1791b1" />
        <Text style={styles.heading}>CAMERAS</Text>
      </View>

      <ScrollView contentContainerStyle={styles.videoContainer}>
        {videoUrls.map((url, index) => (
          <View key={index} style={styles.videoWrapperContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.videoTitle}>Cam {index + 1}</Text>
            
            </View>

            <View
              style={[
                styles.videoWrapper,
                { width: videoWidth, height: videoHeight, backgroundColor: availability[index] ? "transparent" : "#808080" },
              ]}
            >
              {availability[index] ? (
                <WebView
                  ref={(ref) => (videoRefs.current[index] = ref)}
                  source={{ uri: url }}
                  style={{ width: "100%", height: "100%" }}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  shouldPlay
                  mediaPlaybackRequiresUserAction={true}
                />
              ) : (
                <Text style={styles.text}>Video Unavailable</Text>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",

  },
  header: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "baseline",
    marginLeft:20
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginLeft: 5,
  },
  videoContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 50,
    marginTop: 20,
  },
  videoWrapperContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
  },
  videoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  stopButton: {
    padding: 5,
  },
  stopButtonText: {
    color: "#ff0000",
    fontSize: 15,
    fontWeight: "bold",
  },

});
