import React, {useContext, useRef, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Image, Text} from 'react-native-elements';
import {MusicInfoContext} from '../../context/MainContext';
import {ScrollContext} from '../../context/ScrollContext';
import LyricContent from './LyricContent';

const ImageContent = () => {
  const musicProps = useContext(MusicInfoContext);
  return (
    <View>
      <Image
        source={{uri: musicProps?.musicInfo.picUrl}}
        style={styles.image}
      />
    </View>
  );
};

export default function ModalContent() {
  const [showPicture, setPicture] = useState<boolean>(true);
  return (
    <View style={styles.imageContainer}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => {
          setPicture(!showPicture);
        }}>
        {showPicture ? <ImageContent /> : <LyricContent />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
    borderRadius: 250,
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 5,
  },
});
