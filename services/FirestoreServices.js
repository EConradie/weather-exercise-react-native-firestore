import {
  collection,
  getDocs,
  doc,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
export const addReading = async (dayId, readingData) => {
  // TODO: Add reading to specific day

  try {
    //1. Specify where we want to get the data from
    const dayRef = doc(db, "days", dayId); //To Target a specific document

    //2. specify the subcollection
    const readingRef = collection(dayRef, "readings");

    //Add document into this subcollection we have
    const docRef = await addDoc(readingRef, readingData);

    console.log("Document written with ID: ", docRef.id);

    return true; //Success
  } catch (e) {
    console.log("Error adding document reading: ", e);
    return false; //Failure
  }
};

export const getAllDays = async () => {
  // TODO: return the days that we want to read

  try {
    //1. Specify where we want to get the data from
    const collectionRef = collection(db, "days");

    const q = query(collectionRef, orderBy("dayOfWeek", "asc"));

    //2. Specify what it is what we want to do with this collection
    const querySnapshot = await getDocs(q);

    //3.Process my data to be managable
    var daysData = []; //<-- This is what I want to return

    //Loop through each document so I can add it to the item I want to return
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      //... Copy the object structure spread operator
      var theDay = { ...doc.data(), id: doc.id };
      daysData.push(theDay);
    });

    return daysData;
  } catch (e) {
    console.error("Error fetching days: ", e);
    return [];
  }
};
