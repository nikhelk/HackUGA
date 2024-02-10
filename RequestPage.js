import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

const RequestPage = () => {
  const [requestedItem, setRequestedItem] = useState('');
  const [requestedPrice, setRequestedPrice] = useState('');

  const handleSubmit = () => {
    // Replace 'http://localhost:5000/make_request' with your actual Flask server URL
    // When testing on a device, use your network IP or ngrok URL instead of localhost
    const url = 'http://172.21.82.182:5000/api/make_request';
    const customer_id = 1; // Hardcoded as per your requirement

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requested_item: requestedItem,
        requested_price: requestedPrice,
        customer_id: customer_id,
      }),
    })
    .then(() => {
      Alert.alert("Success", "Request submitted successfully.");
      // Optionally reset the form fields here
      setRequestedItem('');
      setRequestedPrice('');
    })
    .catch(error => {
      console.error('Error:', error);
      Alert.alert("Error", "Failed to submit request.");
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Item"
        value={requestedItem}
        onChangeText={setRequestedItem}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={requestedPrice}
        onChangeText={setRequestedPrice}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
  },
});

export default RequestPage;
