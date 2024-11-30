/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

// import { useRoute } from '@react-navigation/native'; // To access params passed during navigation
import Config from 'react-native-config';

const FieldDetailsScreen = () => {
  //   const route = useRoute();
  //   const { fieldId } = route.params; // Get the fieldId from route params
  const [fieldData, setFieldData] = useState(null);
  const [relatedData, setRelatedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFieldData = async () => {
      try {
        const response = await axios.get(`${Config.BASE_URL}/field/daily/data`);
        // console.log(response.data);
        const {Dailydata} = response.data;
        setFieldData(Dailydata[0]);
      } catch (error) {
        console.error('Error fetching field data', error);
      }
    };
    fetchFieldData();
  }, []);

  // Function to fetch related data when the button is clicked
  const handleFetchRelatedData = async () => {
    setIsLoading(true);
    console.log(Math.random() * 160 + 1);
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
      setIsLoading(false);
      console.log(response.data.predicted_crop);
    } catch (error) {
      console.error('Error fetching related data', error);
    }
  };
  // console.log(fieldData);

  return (
    <View style={styles.container}>
      {fieldData ? (
        <View style={styles.innerContainer}>
          <Text style={styles.heading}>Field Data</Text>
          <Text style={styles.textColor}>ID: {fieldData._id}</Text>
          <Text style={styles.textColor}>Date: {fieldData.date}</Text>
          <Text style={styles.textColor}>
            Temperature: {fieldData.temperature}°C
          </Text>
          <Text style={styles.textColor}>Humidity: {fieldData.humidity}%</Text>
          <Text style={styles.textColor}>Moisture: {fieldData.moisture}</Text>

          {isLoading ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color="#ff6600" />
            </View>
          ) : (relatedData &&
            <View style={styles.relatedDataContainer}>
              <Text style={styles.textColor}>
                Predicted Crop: {relatedData}
              </Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.fetchButton}
            onPress={handleFetchRelatedData} // Replace with your function
          >
            <Text style={styles.buttonText}>Predict Crop</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>Loading field data...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  innerContainer: {
    backgroundColor: '#ffffff', // Card-like container
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  textColor: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  relatedDataContainer: {
    marginTop: 15,
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f0f8ff', // Light blue background for related data
    borderRadius: 8,
  },
  fetchButton: {
    marginTop: 15,
    backgroundColor: '#ff6600', // Bright orange for button
    paddingVertical: 15, // Vertical padding for height
    paddingHorizontal: 30, // Horizontal padding for width
    borderRadius: 8, // Rounded corners
    alignItems: 'center', // Center the text
    justifyContent: 'center', // Vertically align the text
    shadowColor: '#000', // Optional shadow for depth
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Android shadow
  },
  buttonText: {
    color: '#fff', // White text for visibility
    fontWeight: 'bold',
    fontSize: 16, // Adjust font size
  },
});

export default FieldDetailsScreen;
