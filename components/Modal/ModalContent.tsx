import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Image} from 'react-native-elements';
import {MusicInfoContext} from '../../context/MainContext';
import {Lrc} from 'lrc-kit';
import useLrcParser from '../../hooks/useLrcParser';

const ImageContent = () => {
  const musicProps = useContext(MusicInfoContext);
  useLrcParser(musicProps?.musicInfo.id);
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
  return (
    <View style={styles.imageContainer}>
      <ImageContent />
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
    flex: 3,
  },
});
