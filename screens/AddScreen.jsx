import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {Picker} from '@react-native-picker/picker'; //a lot of other cool pickers available rather than this one
import React, { useEffect, useState } from 'react'
import { getAllDays, addReading } from '../services/FirestoreServices';
import { Timestamp } from 'firebase/firestore';


const AddScreen = ({ navigation }) => {

    const [temperature, setTemp] = useState("")
    const [selectedDay, setSelectedDay] = useState("")
    const [days, setDays] = useState([])

    const handleCreation = async () => {
        // TODO: Create new reading for the specific day
        //1. Create my data that needs to be added
        var reading = {
            temp: temperature,
            time: Timestamp.now()
        }

        //2. Call the addReading function
        var success = await addReading(selectedDay, reading); //True or false based on the async

        if (success) {
            navigation.navigate("Home");
        } else {
            alert("Failed to add reading");
        }

    }

    useEffect(() => {
        handleGettingDays();
    }, []);

    const handleGettingDays = async () => {
        try {
            const dayData = await getAllDays();
            setDays(dayData);
            setSelectedDay(dayData[0].id);
        } catch (error) {
            console.error("Error fetching days: ", error);
        }
    }

  return (
    <View style={styles.container}>

        <Picker
            style={styles.inputField}
            selectedValue={selectedDay}
            onValueChange={(itemValue, itemIndex) =>
                setSelectedDay(itemValue)
            }>
                {/* TODO: Update to data from db */}
                {days.length > 0 ? (
                    days.map((day) => (
                        <Picker.Item key={day.id} label={day.name} value={day.id} />
                    ))
                ) : null}
               
        </Picker>

        <TextInput
            style={styles.inputField}
            placeholder="Temperature"
            onChangeText={newText => setTemp(newText)}
            defaultValue={temperature}
        />      

        <TouchableOpacity style={styles.button} onPress={handleCreation} >
            <Text style={styles.buttonText}>Add Reading</Text>
        </TouchableOpacity>
    
    </View>  

  )
}

export default AddScreen

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    inputField: {
        borderWidth: 2,
        borderColor: 'black',
        marginTop: 15,
        padding: 10
    },
    button: {
        backgroundColor: "black",
        textAlign: 'center',
        padding: 15,
        marginTop: 30
    },
    buttonText: {
        textAlign: 'center',
        color: 'white'
    },
})