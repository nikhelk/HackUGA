import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to</Text>
      <Text style={styles.appTitle}>NeighborlyNeeds</Text>
      <TouchableOpacity
        style={[styles.button, styles.feedButton]}
        onPress={() => navigation.navigate('Feed')}
      >
        <Text style={styles.buttonText}>Go to Feed</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.requestButton]}
        onPress={() => navigation.navigate('RequestPage')}
      >
        <Text style={styles.buttonText}>Go to Request Page</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1b41', // Dark blue background color
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#f1ffe7', // White text color
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#f1ffe7', // White text color
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff', // White text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  feedButton: {
    backgroundColor: '#3f51b5', // Dark purple
  },
  requestButton: {
    backgroundColor: '#6290c3', // Red
  },
});

export default HomeScreen;
