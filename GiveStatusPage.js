import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const GiveStatusPage = ({ route }) => {
  // Extracting customerId passed through navigation
  const { customerId } = route.params;

  const handleConfirm = () => {
    // Placeholder for future logic
    alert('Confirm button pressed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Order Filled!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default GiveStatusPage;
