import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

const RequestPage = ({ navigation }) => {
  const [requestedItem, setRequestedItem] = useState('');
  const [requestedPrice, setRequestedPrice] = useState('');
  const goToReceiveStatusPage = (customerId, item, id, price) => {
    navigation.navigate('ReceiveStatusPage', {
      customerId: customerId,
      item: item,
      id: id,
      price: price,
    });
  };
  const handleSubmit = () => {
    // Replace 'http://localhost:5000/make_request' with your actual Flask server URL
    // When testing on a device, use your network IP or ngrok URL instead of localhost
    const url = 'http://172.21.82.182:5000/api/make_request';
    function getRandomInt(min, max) {
      min = Math.ceil(min); // Ensure the min is rounded up to the nearest whole number
      max = Math.floor(max); // Ensure the max is rounded down to the nearest whole number
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const int = getRandomInt(0,11)
    let customer_id = "Nikhel"
    if (int <= 50) {
      customer_id = "Ashima"; // Hardcoded as per your requirement
    }


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
            customerId: customer_id, // or the specific ID used
          });


        // You can now use data.new_id as needed in your app
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
