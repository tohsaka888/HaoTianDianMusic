import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';

export default function Category() {
  const height = StatusBar.currentHeight;
  return (
    <View>
      <View style={{height: height}} />
      <Text style={styles.title}>标签分类</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
