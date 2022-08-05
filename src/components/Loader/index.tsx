
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View as RNView,
} from 'react-native';

export function Loader() {
  return (
    <RNView style={styles.container}>
      <ActivityIndicator color="green" size="large" />
    </RNView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
