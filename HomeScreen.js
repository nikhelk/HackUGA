import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Go to Feed"
        onPress={() => navigation.navigate('Feed')} // Assuming 'Feed' is the name given to the Feed.js screen in your navigator
      />
      <Button
        title="Go to Request Page"
        onPress={() => navigation.navigate('RequestPage')} // Assuming 'RequestPage' is the name given to the RequestPage.js screen in your navigator
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
