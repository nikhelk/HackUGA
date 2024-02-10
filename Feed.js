import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Feed = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://172.21.82.182:5000/api/feed') // Adjust the URL as necessary
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <ScrollView style={styles.container}>
      {items.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.text}>Date Requested: {item.requested}</Text>
          <Text style={styles.text}>Item: {item.item}</Text>
          <Text style={styles.text}>Cost: ${item.cost.toFixed(2)}</Text>
          <Text style={styles.text}>Customer ID: {item.customer_id}</Text>
        </View>
      ))}
    </ScrollView>
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
