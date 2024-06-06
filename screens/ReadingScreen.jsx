import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ReadingCard from "./ReadingCard";
import { getAllDays } from "../services/FirestoreServices";

const ReadingScreen = ({ navigation }) => {
  const [days, setDays] = useState([]);

  useEffect(() => {
    handleGettingDays();
  }, []);

  // TODO: Get all Days
  const handleGettingDays = async () => {
    try {
      const dayData = await getAllDays();
      setDays(dayData);
    } catch (error) {
      console.error("Error fetching days: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Add Reading" onPress={() => navigation.navigate("Add")} />

      <ScrollView style={styles.scroll}>
        {days != []
          ? days.map((day) => <ReadingCard key={day.id} day={day} />)
          : null}
      </ScrollView>
    </View>
  );
};

export default ReadingScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  scroll: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
});
