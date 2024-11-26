/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const TemplateScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topCircle} />
      <View style={styles.bottomCircle} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
        </View>

        {/* Add any other content here */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#e0e0e0'},
  topCircle: {
    position: 'absolute',
    top: -50,
    left: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#a1e89c',
  },
  bottomCircle: {
    position: 'absolute',
    bottom: -50,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#a1e89c',
  },
  scrollContent: {paddingBottom: 40},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#a1e89c',
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    marginTop: 100,
  },
  headerText: {fontSize: 24, fontWeight: 'bold', color: '#000'},
});

export default TemplateScreen;
