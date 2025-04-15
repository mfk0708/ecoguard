import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, ScrollView } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const Event = () => {
  const images = [
    "https://th.bing.com/th/id/R.cd60cabbe3943f19321e2ccc8197f7a2?rik=D41hFxHaqYJb8g&riu=http%3a%2f%2fwww.baltana.com%2ffiles%2fwallpapers-2%2fIndian-Elephant-Background-Wallpaper-07945.jpg&ehk=wfmMY3VUg7C%2fsolgozv5ht4EPDMQKjG5c0YZc%2fWL7Ts%3d&risl=&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/R.cd60cabbe3943f19321e2ccc8197f7a2?rik=D41hFxHaqYJb8g&riu=http%3a%2f%2fwww.baltana.com%2ffiles%2fwallpapers-2%2fIndian-Elephant-Background-Wallpaper-07945.jpg&ehk=wfmMY3VUg7C%2fsolgozv5ht4EPDMQKjG5c0YZc%2fWL7Ts%3d&risl=&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/R.cd60cabbe3943f19321e2ccc8197f7a2?rik=D41hFxHaqYJb8g&riu=http%3a%2f%2fwww.baltana.com%2ffiles%2fwallpapers-2%2fIndian-Elephant-Background-Wallpaper-07945.jpg&ehk=wfmMY3VUg7C%2fsolgozv5ht4EPDMQKjG5c0YZc%2fWL7Ts%3d&risl=&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/R.cd60cabbe3943f19321e2ccc8197f7a2?rik=D41hFxHaqYJb8g&riu=http%3a%2f%2fwww.baltana.com%2ffiles%2fwallpapers-2%2fIndian-Elephant-Background-Wallpaper-07945.jpg&ehk=wfmMY3VUg7C%2fsolgozv5ht4EPDMQKjG5c0YZc%2fWL7Ts%3d&risl=&pid=ImgRaw&r=0",
  ];

  const [timestamps, setTimestamps] = useState([]);

  useEffect(() => {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const amPm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12; 

    const formattedDate = `${hours}:${minutes.toString().padStart(2, "0")} ${amPm}, ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

    setTimestamps(new Array(images.length).fill(formattedDate));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome5 name="fire" size={24} color="#1791b1" style={styles.logo} />
        <Text style={styles.heading}> EVENT</Text>
      </View>

      <ScrollView>
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Text style={styles.timestamp}>{timestamps[index]}</Text>
            <Image source={{ uri: image }} style={styles.image} resizeMode="cover"/>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  header: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "baseline",
    marginLeft: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  imageContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  timestamp: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  image: {
    width: "90%",
    height: 150,
    borderRadius: 10,

  },
});

export default Event;
