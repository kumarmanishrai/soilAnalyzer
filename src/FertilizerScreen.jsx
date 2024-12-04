import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import { Picker } from '@react-native-picker/picker';

const FertilizerScreen = () => {
  const [crop, setCrop] = useState('');
  const [moisture, setMoisture] = useState('');
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [pH, setPH] = useState('');
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
        pH,
      });
      console.log(response.data);
      setPredictedValues(response.data);
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Fertilizer Prediction</Text>
          <Text style={styles.subHeader}>Optimize Your Crop Nutrition</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Select Crop</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={crop}
                style={styles.picker}
                itemStyle={styles.pickerItem}
                onValueChange={(itemValue) => setCrop(itemValue)}
              >
                <Picker.Item label="Select a Crop" value="" />
                {crops.map((cropName, index) => (
                  <Picker.Item 
                    key={index} 
                    label={cropName.charAt(0).toUpperCase() + cropName.slice(1)} 
                    value={cropName} 
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Soil Moisture (%)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholderTextColor="#A9A9A9"
              placeholder="Enter Moisture"
              value={moisture}
              onChangeText={setMoisture}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Temperature (°C)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholderTextColor="#A9A9A9"
              placeholder="Enter Temperature"
              value={temperature}
              onChangeText={setTemperature}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Humidity (%)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholderTextColor="#A9A9A9"
              placeholder="Enter Humidity"
              value={humidity}
              onChangeText={setHumidity}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Soil pH Level</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholderTextColor="#A9A9A9"
              placeholder="Enter pH Level"
              value={pH}
              onChangeText={setPH}
            />
          </View>

          <TouchableOpacity 
            style={styles.predictButton} 
            onPress={handleFetch}
          >
            <Text style={styles.predictButtonText}>Get Fertilizer Recommendation</Text>
          </TouchableOpacity>
        </View>

        {predictedValues && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultHeader}>Recommended Fertilizer Composition</Text>
            <View style={styles.resultGrid}>
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>Nitrogen (N)</Text>
                <Text style={styles.resultValue}>{predictedValues.N}</Text>
              </View>
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>Phosphorus (P)</Text>
                <Text style={styles.resultValue}>{predictedValues.P}</Text>
              </View>
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>Potassium (K)</Text>
                <Text style={styles.resultValue}>{predictedValues.K}</Text>
              </View>
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>pH Level</Text>
                <Text style={styles.resultValue}>{predictedValues.pH}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 8,
    fontWeight: '600',
  },
  pickerWrapper: {
    backgroundColor: '#ECF0F1',
    borderRadius: 10,
  },
  picker: {
    height: 50,
    color: '#2C3E50',
  },
  pickerItem: {
    fontSize: 16,
  },
  input: {
    height: 50,
    backgroundColor: '#ECF0F1',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#2C3E50',
  },
  predictButton: {
    backgroundColor: '#27AE60',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  predictButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
  },
  resultGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  resultItem: {
    width: '47%',
    backgroundColor: '#ECF0F1',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 5,
  },
  resultValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
  },
});

export default FertilizerScreen;