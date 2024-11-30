/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, Button, ScrollView} from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import { Picker } from '@react-native-picker/picker';


const FertilizerScreen = () => {
  const [crop, setCrop] = useState('');
  const [moisture, setMoisture] = useState('');
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [predictedValues, setPredictedValues] = useState(null);

  const crops = [
    'mothbeans', 'orange', 'kidneybeans', 'pigeonpeas', 'grapes', 'lentil',
    'papaya', 'banana', 'pomegranate', 'cotton', 'coconut', 'watermelon',
    'mango', 'mungbean', 'jute', 'chickpea', 'apple', 'blackgram', 'maize',
    'muskmelon', 'coffee',
  ];


  const handleFetch = async () => {
    try {
      const response = await axios.post(`${Config.MODEL_URL}/predict/fertilizer`, {
        crop,
        moisture,
        temperature,
        humidity,
      });
      console.log(response.data);
      setPredictedValues(response.data);
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Fertilizer Prediction</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Select Crop:</Text>
        <Picker
          selectedValue={crop}
          style={styles.input}
          onValueChange={(itemValue) => setCrop(itemValue)}
        >
          <Picker.Item label="Select a Crop" value="" />
          {crops.map((cropName, index) => (
            <Picker.Item key={index} label={cropName} value={cropName} />
          ))}
        </Picker>

        <Text style={styles.label}>Soil Moisture:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter Moisture"
          value={moisture}
          onChangeText={setMoisture}
        />

        <Text style={styles.label}>Temperature (°C):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter Temperature"
          value={temperature}
          onChangeText={setTemperature}
        />

        <Text style={styles.label}>Humidity (%):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter Humidity"
          value={humidity}
          onChangeText={setHumidity}
        />


        <Button title="Fetch Prediction" onPress={handleFetch} />
      </View>

      {predictedValues && (
        <View style={styles.result}>
          <Text style={styles.resultHeader}>Predicted Fertilizer Values:</Text>
          <Text style={styles.text}><Text style={styles.text}>N:</Text> {predictedValues.N}</Text>
          <Text style={styles.text}><Text style={styles.text}>P:</Text> {predictedValues.P}</Text>
          <Text style={styles.text}><Text style={styles.text}>K:</Text> {predictedValues.K}</Text>
          <Text style={styles.text}><Text style={styles.text}>pH:</Text> {predictedValues.pH}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ccc',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  // input: {
  //   height: 40,
  //   borderColor: '#ccc',
  //   borderWidth: 1,
  //   marginBottom: 15,
  //   paddingLeft: 10,
  //   borderRadius: 5,
  //   color: '#000',

  // },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    backgroundColor: 'gray',
    marginBottom: 20,
    fontSize: 16,
    paddingHorizontal: 10,
    color: '#fff',
  },
  result: {
    marginTop: 20,
    marginBottom: 100,
    padding: 15,
    backgroundColor: '#e6f7e6',
    borderRadius: 5,
    borderWidth: 1,
    color: '#000',
    borderColor: '#4CAF50',
  },
  resultHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
    color: '#000',
  },
  text: {
    fontWeight: 'bold',
    color: '#000',
  },
});

export default FertilizerScreen;
