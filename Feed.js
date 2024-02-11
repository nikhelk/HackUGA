import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, Button, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
const Feed = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFeed = () => {
    setRefreshing(true);
    // Adjust the URL as necessary
    fetch('http://172.21.82.182:5000/api/feed') 
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        console.log(data[0])
        setRefreshing(false); // Reset refreshing state
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setRefreshing(false); // Reset refreshing state even on error
      });
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const goToGiveOrderPage = (id) =>  {
    console.log(id)
    fetch('http://172.21.82.182:5000/api/fill_order', {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify({
        param1: id
      }),
    })
      .then(response => response.json())
      .then(data => {
      })
      .catch(error => {
        console.error('Error fetching status:', error);
      });

    navigation.navigate('GiveStatusPage', { id });
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={fetchFeed}
        />
      }
    >
      {items.map((item) => (
        <View key={item.id.toString()} style={styles.item}>
          <Text style={styles.text}>Item: {item.item}</Text>
          <Text style={styles.text}>Cost: {item.cost}</Text>
          <Text style={styles.text}>Customer ID: {item.customer_id}</Text>
          <Button title="Fill Order" onPress={() => goToGiveOrderPage(item.id)} />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Feed;
