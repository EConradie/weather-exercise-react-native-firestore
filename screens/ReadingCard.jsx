import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { db } from "../firebase";
import { collection, onSnapshot, doc, query } from "firebase/firestore";

const ReadingCard = (props) => {
  // TODO: Setup Realtime Listening for the specific day's readings
  const { day } = props;
  
  const [readings, setReadings] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      console.log("I'm focused");

      const dayRef = doc(db, "days", day.id);

      const readingRef = collection(dayRef, "readings"); 

      //OnSnapshot = listen to the data changes
      const unsubscribe = onSnapshot(readingRef, (querySnapshot) => {
        const readingDate = [];
        querySnapshot.forEach((doc) => {
          readingDate.push(doc.data());
          console.log("Current readings: ", doc.data());
        });

        setReadings(readingDate);
      });

      return () => {
        console.log("I'm unfocused");
        unsubscribe();
      };
    }, [])
  );

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        <Feather name={day.icon} size={28} color="black" />
        {"  " + day.name + "  "}
        <Feather name={day.icon} size={28} color="black" />
      </Text>

      <View style={styles.readingsBlock}>
        {readings != [] ? (
          readings.map((item) => (
            <View style={styles.readingBubble} key={item.id}>
              <Text style={styles.readingText}>{item.temp}</Text>
            </View>
          ))
        ) : (
          <Text>No reading yet</Text>
        )}
      </View>
    </View>
  );
};

export default ReadingCard;

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
  },
  readingsBlock: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 20,
  },
  readingBubble: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "black",
    borderRadius: 10,
  },
  readingText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
