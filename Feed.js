import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity, StyleSheet } from 'react-native';

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
          tintColor="#ffffff" // White color for refresh indicator
        />
      }
    >
      {items.map((item) => (
        <TouchableOpacity key={item.id.toString()} style={styles.itemContainer} onPress={() => goToGiveOrderPage(item.id)}>
          <View style={styles.item}>
            <Text style={styles.text}>Item: {item.item}</Text>
            <Text style={styles.text}>Cost: {item.cost}</Text>
            <Text style={styles.text}>Customer Name: {item.customer_id}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Fill Order</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light gray background color
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc', // Light gray border color
  },
  item: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333333', // Dark text color
  },
  buttonContainer: {
    backgroundColor: '#3f51b5', // Dark purple button color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff', // White text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Feed;
