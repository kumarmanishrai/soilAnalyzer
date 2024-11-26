/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DoubtScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>

       {/* Upper Green Circle Design */}
       <View style={styles.upperCircle1} />
       <View style={styles.upperCircle2} />

      <Text>Doubt</Text>

      {/* Lower Green Circle Design */}
      <View style={styles.lowerCircle1} />
      <View style={styles.lowerCircle2} />

    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  upperCircle2: {
    position: 'absolute',
    width: 300,
    height: 300,
    backgroundColor: '#57cc72',
    borderRadius: 200,
    top: -180,
    right:-80,
    zIndex: -10,
  },
  upperCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: '#a1e89c',
    borderRadius: 150,
    top: -100,
    right: 155,
    zIndex : -11,
  },
  lowerCircle1: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: '#57cc72',
    borderRadius: 75,
    bottom: 90,
    left: 70,
    zIndex : -11,

  },
  lowerCircle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    backgroundColor: '#57cc72',
    borderRadius: 75,
    bottom: -50,
    left: -50,
    zIndex : -11,

  },
});

export default DoubtScreen;
