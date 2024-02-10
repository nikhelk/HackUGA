import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';

const Feed = ({ navigation }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Adjust the URL as necessary
    fetch('http://172.21.82.182:5000/api/feed') 
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const goToGiveOrderPage = () => {
    navigation.navigate('GiveStatusPage'); // Ensure 'GiveStatusPage' is correctly defined in your navigation stack
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items} // Changed from 'feed' to 'items' to match the state variable name
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>Item: {item.item}</Text>
            <Text style={styles.text}>Cost: {item.cost}</Text>
            <Text style={styles.text}>Customer ID: {item.customer_id}</Text>
            <Button title="Fill Order" onPress={goToGiveOrderPage} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  text: {
    fontSize: 16,
  },
});

export default Feed;
