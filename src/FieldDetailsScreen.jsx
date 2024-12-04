import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import Config from 'react-native-config';

const FieldDetailsScreen = () => {
  const [fieldData, setFieldData] = useState(null);
  const [relatedData, setRelatedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFieldData = async () => {
      try {
        const response = await axios.get(`${Config.BASE_URL}/field/daily/data`);
        const { Dailydata } = response.data;
        setFieldData(Dailydata[0]);
      } catch (error) {
        console.error('Error fetching field data', error);
      }
    };
    fetchFieldData();
  }, []);

  const handleFetchRelatedData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${Config.MODEL_URL}/predict/crop`, {
        nitrogen: fieldData.nitrogen || Math.random() * 160 + 1,
        phosphorus: fieldData.phosphorus || Math.random() * 177 + 1,
        potassium: fieldData.potassium || Math.random() * 100 + 1,
        humidity: fieldData.humidity,
        temperature: fieldData.temperature,
        ph: fieldData.ph || Math.random() * 10 + 1,
        moisture: fieldData.moisture || Math.random() * 1000 + 1,
      });
      setRelatedData(response.data.predicted_crop);
    } catch (error) {
      console.error('Error fetching related data', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {fieldData ? (
          <>
            <Text style={styles.heading}>Field Details</Text>
            <View style={styles.fieldInfo}>
              <Icon name="calendar-today" size={20} color="#555" />
              <Text style={styles.text}>Date: {fieldData.date}</Text>
            </View>
            <View style={styles.fieldInfo}>
              <Icon name="thermostat" size={20} color="#555" />
              <Text style={styles.text}>
                Temperature: {fieldData.temperature}°C
              </Text>
            </View>
            <View style={styles.fieldInfo}>
              <Icon name="water-drop" size={20} color="#555" />
              <Text style={styles.text}>Humidity: {fieldData.humidity}%</Text>
            </View>
            <View style={styles.fieldInfo}>
              <Icon name="waves" size={20} color="#555" />
              <Text style={styles.text}>Moisture: {fieldData.moisture}</Text>
            </View>

            {isLoading ? (
              <ActivityIndicator size="large" color="#ff6600" />
            ) : (
              relatedData && (
                <View style={styles.relatedData}>
                  <Text style={styles.text}>Predicted Crop: {relatedData}</Text>
                </View>
              )
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={handleFetchRelatedData}
            >
              <Text style={styles.buttonText}>Predict Crop</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.loadingText}>Loading field data...</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2f3', // Light background with a modern look
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 8,
    width: '90%',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  fieldInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
  },
  relatedData: {
    marginTop: 20,
    backgroundColor: '#e0f7fa',
    borderRadius: 8,
    padding: 10,
  },
  button: {
    backgroundColor: '#ff6600',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingText: {
    color: '#555',
    fontSize: 18,
  },
});

export default FieldDetailsScreen;
