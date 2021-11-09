import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import LovedMusic from './LovedMusic';
import RecommendPlaylist from './RecommendPlaylist';
import RecommendMusic from './RecommendMusic';

export default function LoginContent() {
  return (
    <View style={styles.main}>
      <LovedMusic />
      <RecommendPlaylist />
      <RecommendMusic />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
