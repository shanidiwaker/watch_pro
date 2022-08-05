import React from 'react';
import {View, StyleSheet} from 'react-native';

const SeparatorLine = () => {
  return <View style={styles.line} />;
};

const styles = StyleSheet.create({
  line: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});

export default SeparatorLine;
