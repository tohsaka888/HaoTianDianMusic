// import {useRoute} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import PlaylistHeader from './PlaylistHeader';
import PlaylistContent from './PlaylistContent';

export default function Playlist({route}: any) {
  const params = route.params;
  return (
    <View style={styles.playlist}>
      {params.detail && <PlaylistHeader music={params.detail} />}
      {params.detail.tracks && (
        <PlaylistContent tracks={params.detail.tracks} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  playlist: {
    flex: 1,
  },
});
