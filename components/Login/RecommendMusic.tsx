import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function RecommendMusic() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>随机歌曲</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    margin: 16,
    marginTop: 0,
    backgroundColor: '#cecece1f',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  title: {
    color: 'white',
    fontSize: 12,
  },
});
