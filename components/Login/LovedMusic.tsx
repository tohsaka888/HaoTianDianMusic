import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Image} from 'react-native-elements';
import bak1 from '../../assets/images/bak1.jpg';

export default function LovedMusic() {
  return (
    <View style={styles.container}>
      <Image source={bak1} style={styles.coverImage} />
      <View style={styles.infoArea}>
        <Text style={styles.musicName}>我喜欢的音乐</Text>
        <Text style={styles.numbers}>共0首</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    margin: 16,
    backgroundColor: '#cecece1f',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  coverImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  musicName: {
    color: 'white',
    fontSize: 16,
  },
  infoArea: {
    marginLeft: 16,
  },
  numbers: {
    marginTop: 8,
    color: 'white',
  },
});
