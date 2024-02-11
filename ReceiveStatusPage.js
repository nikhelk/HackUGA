import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Button } from 'react-native';

const ReceiveStatusPage = ({route}) => {
  const [status, setStatus] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const { customerId,item,id, price } = route.params;
  const fetchStatus = useCallback(() => {
    id_input = (route.params.newId)
    setRefreshing(true);
    // Replace URL with your actual Flask server endpoint
  
    fetch('http://172.21.82.182:5000/api/get_updated_status', {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify({
        id: route.params.newId
      }),
    })
      .then(response => response.json())
      .then(data => {
        setStatus(data.status); // Assuming the API returns an object with a 'status' key
        setRefreshing(false);
      })
      .catch(error => {
        console.error('Error fetching status:', error);
        setRefreshing(false);
      });
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  const handleCompleteTransaction = () => {
    // Logic to handle completing the transaction
    console.log('Transaction completed');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchStatus} />}
    >
      <Text style={styles.statusText}>
        {status === 1 ? 'Pending' : 'Go to room'}
      </Text>
      <Button
        title="Complete Transaction"
        onPress={handleCompleteTransaction}
        disabled={status === 1} // Disabled if status is 1 (Pending)
        color={status === 1 ? "#ccc" : "#007AFF"} // Grey out if status is 1 (Pending), else default color
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  statusText: {
    fontSize: 20,
    marginBottom: 20, // Add some spacing between the text and the button
  },
});

export default ReceiveStatusPage;
