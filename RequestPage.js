import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const RequestPage = ({ navigation }) => {
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
      .then(response => response.json())
      .then(data => {
        console.log('New ID:', data.new_id);

        navigation.navigate('ReceiveStatusPage', {
          newId: data.new_id,
          // Include any other data you wish to pass to ReceiveStatusPage
          requestedItem: requestedItem,
          requestedPrice: requestedPrice,
          customerId: 1, // or the specific ID used
        });
      })
      .catch(error => console.error('Error:', error));
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
      <Button title="Submit" onPress={handleSubmit} color="#3f51b5" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1a1b41', // Dark blue background color
  },
  input: {
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#cccccc', // Light gray border color
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff', // White background color
  },
});

export default RequestPage;
