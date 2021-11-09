import React from 'react';
import {View} from 'react-native';
import LovedMusic from './LovedMusic';
import RecommendPlaylist from './RecommendPlaylist';
import RecommendMusic from './RecommendMusic';

export default function LoginContent() {
  return (
    <View>
      <LovedMusic />
      <RecommendPlaylist />
      <RecommendMusic />
    </View>
  );
}
