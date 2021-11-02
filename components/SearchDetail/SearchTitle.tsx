import React from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../HomePage/Header';

export default function SearchTitle() {
  return (
    <View>
      <Header />
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    height: 40,
  },
});
