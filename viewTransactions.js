import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, RefreshControl, Button, StyleSheet } from 'react-native';

const Feed = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFeed = () => {
    setRefreshing(true);
    // Adjust the URL as necessary
    fetch('http://172.21.82.182:5000/') 
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

  const goToGiveOrderPage = (customerId) => {
    navigation.navigate('GiveStatusPage', { customerId });
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
          <Button title="Fill Order" onPress={() => goToGiveOrderPage(item.customer_id)} />
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
